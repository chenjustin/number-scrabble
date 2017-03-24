import React from 'react';
import NewPlayerView from './NewPlayerView';
import LobbyView from './LobbyView';

var socket;

class GameApp extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      view: 'NewPlayerView'
    };

    this.updatePlayerName = this.updatePlayerName.bind(this);
  }

  updatePlayerName(name) {
    this.setState({
      playerName: name,
      view: 'LobbyView'
    });
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