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
        return(
          <div>
            <header>
              <div id={"title"}>Number Scrabble</div>
            </header>
            <div className={"main-container"}>
              <NewPlayerView updateName = {this.updatePlayerName}/>
            </div>
          </div>
        );

      case "LobbyView":
        return(
          <div>
            <header>
              <div id={'title'}>Number Scrabble</div>
            </header>
            <div className={"main-container"}>
              <LobbyView
                playerName = {this.state.playerName}
                joinGameRoom = {this.joinGameRoom}
                socket = {this.state.socket}
              />
            </div>
          </div>
        );

      case "GameView":
        return(
          <div>
            <header>
              <div id={"title"}>Number Scrabble</div>
            </header>
            <div className={"game-outer-container"}>
              <GameView/>
            </div>
          </div>
        );

      default:
        return(
          <div>
            <header>
              <div id={"title"}>Number Scrabble</div>
            </header>
            <div className={"game-outer-container"}>
              <GameView/>
            </div>
          </div>
        );
    }
  }
}

export default GameApp;