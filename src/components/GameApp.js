import React from 'react';
import NewPlayerView from './NewPlayerView';
import LobbyView from './LobbyView';

var socket;

class GameApp extends React.Component {
  constructor() {
    super();
    this.state = {
      onlineUsers: [],
      playerName: '',
      view: 'NewPlayerView'
    };

    this.updatePlayerName = this.updatePlayerName.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  updatePlayerName(name) {
    this.setState({
      playerName: name,
      view: 'LobbyView'
    });
  }

  updateView(v){
    this.setState({view: v});
  }
 
  render() {
    switch(this.state.view){
      case "NewPlayerView":
        return(
          <div>
            <header>
              <span id={"title"}>Number Scrabble</span>
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
              <span id={"title"}>Number Scrabble</span>
              <span id={"headerPlayerName"}>Player: {this.state.playerName}</span>
            </header>
            <div className={"main-container"}>
              <LobbyView 
                updateView = {this.updateView}
                playerName = {this.state.playerName}
              />
            </div>
          </div>
        );


      default:
        return(
          <div>
            <header></header>
            <div className={"main-container"}>
              <NewPlayerView updateName = {this.updatePlayerName}/>
            </div>
          </div>
        );
    }
  }
}

export default GameApp;