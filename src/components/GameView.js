import React from 'react';
import BoardTile from './BoardTile';
var initializer = require('../game/initializeBoard');

var socket;

class GameView extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			board: []
		}
	}

	componentDidMount(){

		var board = initializer();
		
		this.setState({
			board: board
		});

	}

	render() {

		return (
			<div id={'Game-View-Wrapper'}>
				<div id={'game-inner-wrapper'}>
					<div id={'GameBoard'}>
						<table>
							<tbody>
							{this.state.board}
							</tbody>
						</table>
					</div>
					<div id={'GameSidebar'}></div>
					<div id={'GameBottombar'}></div>
				</div>
			</div>
			);
	}
}
export default GameView;