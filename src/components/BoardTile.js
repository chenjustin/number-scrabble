import React from 'react';

class BoardTile extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<td className={this.props.tileType}>{this.props.text}</td>
			);
	}
}
export default BoardTile;