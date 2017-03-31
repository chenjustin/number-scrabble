import React from 'react';
import InviteButton from './InviteButton';

class LobbyView extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      onlinePlayers: []
    }

    this.inviteOnClick = this.inviteOnClick.bind(this);
	}

  /* 
      Handles the onClick action for each user's invite button.
  */
  inviteOnClick(player, buttonState){

    var playerList = this.state.onlinePlayers;
    var component = this;

    // Invite a player
    if(buttonState === 'Invite'){

      // Iterate through 'playerList' to find the player whose inviteButton was clicked.
      playerList.forEach(function(element, index){
        if(element.playerName === player){
          element.inviteButton = 'selfClicked';

          // Notify the specified client that this click event occurred

          component.props.socket.emit('invite-someone', 
            {
              sender: component.props.playerName,
              recipient: element.socketId
            }
          );

          /*
            Update the onlinePlayers array, because it also
            contains the state of the each invite button.
          */
          component.setState({
            onlinePlayers: playerList
          })
        }
      });
    }

    /*
      Clicking the button to accept another user's invitation.

      Step 1:
      First, this client will emit a 'accepted-invite' message
      to the server.
      
      Step 2:
      Once the server gets this message, it will emit a 'join-room'
      message to both the user who accepted the invitation as
      well as the 'inviter'.

      This 'initiate-join-room' message will contain the 5 digit room code,
      and it will also trigger the client to change the current view to
      'GameView'.
      
      Step 3:
      Finally, 'initiate-join-room' will send one final 'join-room' message to the server,
      so the server can make that particular socket join the specified room.

      Diagram for reference:

      Inviter's lobby
      ___________________________________________________________________________      
      | Players                                                                 |
      ___________________________________________________________________________   
      |'accepter'                                               (Invite pending)|   
      |                                                                         | 
      ___________________________________________________________________________

                                ^                             |
                      Step 2    |                   Step 3    |
                                |                             |   
                              ('initiate-               ('join-room', room)
                              join-room', newRoom)            |
                                |                             |
                                |                             v
      __________________________________________________________________________
      |                                                                        |
      |         Server                                                         |
      |________________________________________________________________________|

             ^                  |                             ^
    Step 1   |        Step 2    |                   Step 3    |
             |                  |                             |
      ('accepted          ('initiate-                   ('join-room', room)
        invite', inviter)  join-room', newRoom)               |
             |                  |                             |
             |                  v                             |
  
      Accepter's lobby
      ___________________________________________________________________________      
      | Players                                                                 |
      ___________________________________________________________________________   
      |'inviter'                                                        (Accept)|   
      |                                                                         | 
      ___________________________________________________________________________

    */
    else if(buttonState === 'Accept Invitation'){
      
      playerList.forEach(function(element, index) {
        if(element.playerName === player){
          component.props.socket.emit('accepted-invite',element.socketId);
        }
      });
      
    }
  }

  /*
      Once the component is mounted, create a socket instance to
      connect to the server and request the server's current
      list of online users. After receiving that list, remove the
      current user's name from it, then set the state of this component.
  */
  componentDidMount(){

    var component = this;

    /*
      Notify the server of this new connection so the server can update
      its list of users.
    */
    this.props.socket.emit('new-user', {playerName: component.props.playerName}); 
    
    // The server emits an updated list of users everytime there is a new connection
    this.props.socket.on('update-list', function(data){

      var playerList = component.state.onlinePlayers;

      /*
        The user list passed from the server to the client component
        is a list of objects with this structure:

          {
            playerName: (a string),
            id: (an integer),
            socketId: (unique identifier for socket.io)
          }

      */

      // Remove self from the list received from the server.
      data.forEach(function(element, index){
        if(element.playerName === component.props.playerName){
          data.splice(index, 1);
        }
      });

      /*
        Synchronize both lists
      */
      
      data.forEach(function(element, index){

        var componentListContainsUser = false;

        playerList.forEach(function(elem, i){
          if(elem.playerName === element.playerName){
            componentListContainsUser = true;
          }
        });

        if(!componentListContainsUser){
          playerList.push(
            {
              playerName: element.playerName, 
              id: element.id,
              socketId: element.socketId, 
              inviteButton: 'unclicked'
            }
          );
        }
      });

      playerList.forEach(function(element, index){

        var serverListContainsUser = false;

        data.forEach(function(elem, i){
          if(elem.playerName === element.playerName){
            serverListContainsUser = true;
          }
        })

        if(!serverListContainsUser){
          playerList.splice(index, 1);
        }
      });

      component.setState({
        onlinePlayers: playerList
      });
    });

    this.props.socket.on('someone-clicked', function(who){

      var playerList = component.state.onlinePlayers;

      playerList.forEach(function(element, index){
        if(element.playerName === who){
          element.inviteButton = 'someoneClicked';
        }
      })

      component.setState({
        onlinePlayers: playerList
      });

    });

    this.props.socket.on('initiate-join-room', function(room){
      console.log('initiate-join-room');
      component.props.socket.emit('join-room', room);
      component.props.joinGameRoom(room);
    });

  }


  render() {

    var component = this;

    if(this.state.onlinePlayers.length === 0){
      return (
        <div className={'view-container'} id={'lobbyContainer'}>
          <div id={'lobbyTitle'}><h1>Players</h1></div>
          <p>No players are currently in the lobby</p>
        </div>
      )
    }
    else{
      return (
        <div className={'view-container'} id={'lobbyContainer'}>
          <div id={'lobbyTitle'}><h1>Players</h1></div>
            <ul>
              {
                this.state.onlinePlayers.map(function(element){
                  if(element.inviteButton === 'unclicked'){
                    return(
                      <li className={'online-player-list-item'} key={element.id}>
                        <InviteButton 
                          value = {'Invite'} 
                          playerName = {element.playerName} 
                          key = {element.id}
                          onClick = {component.inviteOnClick}
                          clickable = {true}
                        ></InviteButton>
                        {element.playerName}
                      </li>
                    )
                  }
                  else if(element.inviteButton === 'selfClicked'){
                    return(
                      <li className={'online-player-list-item'} key={element.id}>
                        <InviteButton 
                          value = {'Pending Invitation'} 
                          playerName = {element.playerName} 
                          key = {element.id}
                          onClick ={component.inviteOnClick}
                          clickable = {false}
                        ></InviteButton>
                        {element.playerName}
                      </li>
                    )
                  }
                  else{
                    return(
                      <li className={'online-player-list-item'} key={element.id}>
                        <InviteButton 
                          value = {'Accept Invitation'} 
                          playerName = {element.playerName} 
                          key = {element.id}
                          onClick={component.inviteOnClick} 
                          clickable = {true}
                        ></InviteButton>
                        {element.playerName}
                      </li>
                    )
                  }
                })
              }
            </ul>
        </div>
      );
    }
  }
}

export default LobbyView;