import React from 'react';


class InviteButton extends React.Component {

  render() {
  	if(this.props.clickable){
	    return (
	    	<div className={'invite-button-wrapper'}>
		      <button 
		      	className = {"invite-button"} 
		      	onClick = { () => this.props.onClick(this.props.playerName, this.props.value)}
		      >
		      	{this.props.value}
		      </button>
	      </div>
	    );
	  }
	  else{
	  	return (
	    	<div className={'invite-button-wrapper'}>
		      <button 
		      	className = {"invite-button"} 
		      	onClick = { () => this.props.onClick(this.props.playerName, this.props.value)}
		      	disabled={true}
		      >
		      	{this.props.value}
		      </button>
	      </div>
	    );
	  }
  }
}
export default InviteButton;