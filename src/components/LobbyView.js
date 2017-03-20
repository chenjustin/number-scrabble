import React from 'react';
 
class LobbyView extends React.Component {
	constructor(props){
		super(props);
	}

  render() {
    return (
      <div>
        PlayerName: this.props.playerName;
      </div>
    );
  }
}
export default LobbyView;