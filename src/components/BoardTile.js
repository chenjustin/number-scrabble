import React from 'react';

class BoardTile extends React.Component {

  render() {
		return (
			<td className={this.props.tileType}>{this.props.text}</td>
    );
  }
}
export default BoardTile;