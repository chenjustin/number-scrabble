import React from 'react';
import InviteButton from './InviteButton';

var socket;

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
      playerList.forEach(function(element, index){
        if(element.playerName === player){
          element.inviteButton = 'selfClicked';

          // Notify the specified client that this click event occurred

          socket.emit('invite-someone', 
            {
              sender: component.props.playerName,
              recipient: element.socketId
            }
          );

          component.setState({
            onlinePlayers: playerList
          })
        }
      });
    }

    // Accept an invitation
    else{

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

    socket = io('/lobby', {query: "playerName="+this.props.playerName});
  
    // The server emits an updated list of users everytime there is a new connection
    socket.on('update-list', function(data){

      var playerList = component.state.onlinePlayers;

      var spliceIndex;

      /*
        The user list passed from the server to the client component
        is a list of objects with this structure:

          {
            playerName: (a string),
            id: (an integer),
            socketId: (unique identifier for socket.io)
          }

      */

      // Remove self from the list received from the server. We don't need this
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

    socket.on('someone-clicked', function(who){

      var playerList = component.state.onlinePlayers;

      console.log(who);

      playerList.forEach(function(element, index){
        if(element.playerName === who){
          element.inviteButton = 'someoneClicked';
        }
      })

      component.setState({
        onlinePlayers: playerList
      });

      console.log(playerList);

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