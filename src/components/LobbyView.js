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

  inviteOnClick(player){

    var playerList = this.state.onlinePlayers;
    var component = this;

    playerList.forEach(function(element, index){
      if(element.playerName === player){
        playerList[index].inviteButton = 'selfClicked';

        console.log(this);
        component.setState({
          onlinePlayers: playerList
        })
      }
    });



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
  
    socket.on('update-list', function(data){
      // this.updateList(data);

      var playerList = data;
      var playerId;
      var spliceIndex;

      data.forEach(function(element, index){
        playerList[index].inviteButton = 'unclicked';
        if(element.playerName == component.props.playerName){
          spliceIndex = index;
        }
      });
     
      playerList.splice(spliceIndex, 1);

      component.setState({
        onlinePlayers: playerList
      });
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