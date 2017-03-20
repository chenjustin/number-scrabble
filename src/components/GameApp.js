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
  }

  updatePlayerName(name) {
    this.setState({playerName: name});
    console.log(this.state.playerName);
    console.log(this.state)
  }
 
  render() {



    return (
      <div>
        <Navbar/>
        <Footer/>
      </div>
    );
  }
}
export default GameApp;