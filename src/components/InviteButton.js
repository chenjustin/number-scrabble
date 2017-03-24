import React from 'react';


class InviteButton extends React.Component {

  render() {
    return (
      <button className={"invite-button"} onClick = { () => this.props.onClick(this.props.id)}>
      	{this.props.value}
      </button>
    );
  }
}
export default InviteButton;