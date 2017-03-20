import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NewPlayerView from './NewPlayerView';
import LobbyView from './LobbyView';
 
class GameApp extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      view: 'NewPlayerView',
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
            <Navbar/>
            <NewPlayerView updateName = {this.updatePlayerName}/>
            <Footer/>
          </div>
        );

      case "LobbyView":
        return(
          <div>

            <LobbyView 
              updateView = {this.updateView}
              playerName = {this.state.playerName}
            />
          </div>
        );


      default:
        return(
          <div>
            <Navbar/>
            <NewPlayerView updateName = {this.updatePlayerName}/>
            <Footer/>
          </div>
        );
    }
  }
}
export default GameApp;