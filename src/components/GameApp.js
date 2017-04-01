import React from 'react';
import NewPlayerView from './NewPlayerView';
import LobbyView from './LobbyView';
import GameView from './GameView';

var socket;

class GameApp extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      view: 'NewPlayerView',
      socket: '',
      room: ''
    };

    this.updatePlayerName = this.updatePlayerName.bind(this);
    this.joinGameRoom = this.joinGameRoom.bind(this);
  }

  updatePlayerName(name) {
    this.setState({
      playerName: name,
      view: 'LobbyView'
    });
  }

  joinGameRoom(room){
    this.setState({
      view: 'GameView',
      room: room
    });
  }

  componentDidMount(){
    socket = io('/lobby');
    this.setState({
      socket: socket
    })
  }
 
  render() {
    switch(this.state.view){
      case "NewPlayerView":
        return <NewPlayerView updateName = {this.updatePlayerName}/>

      case "LobbyView":
        return(
          <LobbyView
            playerName = {this.state.playerName}
            joinGameRoom = {this.joinGameRoom}
            socket = {this.state.socket} />
        );

      case "GameView":
        return(<GameView/>);

      default:
        return(
          <GameView/>);
    }
  }
}

export default GameApp;