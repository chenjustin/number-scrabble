import React from 'react';


class InviteButton extends React.Component {

  render() {
    return (
    	<div className={'invite-button-wrapper'}>
	      <button className={"invite-button"} onClick = { () => this.props.onClick(this.props.playerName)}>
	      	{this.props.value}
	      </button>
      </div>
    );
  }
}
export default InviteButton;