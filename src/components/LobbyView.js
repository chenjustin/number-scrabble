import React from 'react';
import InviteButton from './InviteButton';

var socket;

class LobbyView extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      onlinePlayers: []
    }

    this.updateList = this.updateList.bind(this);
	}

  updateList(data){

    var playerList = data;

    data.forEach(function(element, index){
      if(element.name == this.props.playerName){
        playerList.splice(index, 1);
        this.setState({
          onlinePlayers: playerList
        });
      }
    });
  }

  componentDidMount(){

    var component = this;

    socket = io('/lobby', {query: "playerName="+this.props.playerName});
  
    socket.on('update-list', function(data){
      // this.updateList(data);

      var playerList = data;

      data.forEach(function(element, index){
        if(element.playerName == component.props.playerName){
          playerList.splice(index, 1);
          component.setState({
            onlinePlayers: playerList
          });
        }
      });
    });

  }


  render() {
    if(this.state.onlinePlayers.length === 0){
      return (
        <div className={'view-container'} id={'lobby-container'}>
          <h1>No users online</h1>
        </div>
      )
    }
    return (
      <div className={'view-container'} id={'lobby-container'}>
        {
          this.state.onlinePlayers.map(function(element){
            return(
              <li className={''} key={element.id}>{element.playerName}
                <InviteButton value={'Invite'} key={element.id} ></InviteButton>
              </li>)
          })
        }
      </div>
    );
  }
}
export default LobbyView;