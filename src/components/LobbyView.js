import React from 'react';

var socket;

class LobbyView extends React.Component {
	constructor(props){
		super(props);
	}

  componentDidMount(){
    socket = io('/lobby', {query: "playerName="+this.props.playerName});
  }

  render() {
    return (
      <div className={"view-container"}>
        PlayerName: {this.props.playerName}
      </div>
    );
  }
}
export default LobbyView;