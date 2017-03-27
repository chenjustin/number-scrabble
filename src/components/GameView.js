import React from 'react';
import BoardTile from './BoardTile';

class GameView extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			board: []
		}
	}

	componentDidMount(){

		// Render the initial gameboard

		var tiles = [];

  	for(var i = 0; i < 15; i++){
  		var row = [];
  		for(var j = 0; j < 15; j++){
  			var type = 'tile';
  			var text = '';

  			// Ugly if-statements
  			// Triple word tiles
  			if((i === 0 && j === 0) ||
  				 (i === 0 && j === 7) ||
  				 (i === 0 && j === 14) ||
  				 (i === 7 && j === 0) ||
  				 (i === 7 && j === 14) ||
  				 (i === 14 && j === 0) ||
  				 (i === 14 && j === 7) ||
  				 (i === 14 && j === 14)
					){
  				type += ' tile-tripleWord';
  				text = 'TW';
				}

				// Double letter tiles
				else if((i === 0 && j === 3) ||
								(i === 0 && j === 11) ||
								(i === 2 && j === 6) ||
								(i === 2 && j === 8) ||
								(i === 3 && j === 0) ||
								(i === 3 && j === 7) ||
								(i === 3 && j === 14) ||
								(i === 6 && j === 2) ||
								(i === 6 && j === 6) ||
								(i === 6 && j === 8) ||
								(i === 6 && j === 12) ||
								(i === 7 && j === 3) ||
								(i === 7 && j === 11) ||
								(i === 8 && j === 2) ||
								(i === 8 && j === 6) ||
								(i === 8 && j === 8) ||
								(i === 8 && j === 12) ||
								(i === 11 && j === 0) ||
								(i === 11 && j === 7) ||
								(i === 11 && j === 14) ||
								(i === 12 && j === 6) ||
								(i === 12 && j === 8) ||
								(i === 14 && j === 3) ||
								(i === 14 && j === 11)
					){
					type += ' tile-doubleLetter';
					text = 'DL';
				}

				// Double Word tiles
				else if((i === 1 && j === 1) ||
								(i === 1 && j === 13) ||
								(i === 2 && j === 2) ||
								(i === 2 && j === 12) ||
								(i === 3 && j === 3) ||
								(i === 3 && j === 11) ||
								(i === 4 && j === 4) ||
								(i === 4 && j === 10) ||
								(i === 10 && j === 4) ||
								(i === 10 && j === 10) ||
								(i === 11 && j === 3) ||
								(i === 11 && j === 11) ||
								(i === 12 && j === 2) ||
								(i === 12 && j === 12) ||
								(i === 13 && j === 1) ||
								(i === 13 && j === 13)
					){
					type += ' tile-doubleWord';
					text = 'DW';
				}

				// Triple letter tiles
				else if((i === 1 && j === 5) ||
								(i === 1 && j === 9) ||
								(i === 5 && j === 1) ||
								(i === 5 && j === 13) ||
								(i === 5 && j === 5) ||
								(i === 5 && j === 9) ||
								(i === 13 && j === 5) ||
								(i === 13 && j === 9) ||
								(i === 9 && j === 1) ||
								(i === 9 && j === 13) ||
								(i === 9 && j === 5) ||
								(i === 9 && j === 9) 
					){
					type += ' tile-tripleLetter';
					text = 'TL';
				}
				else{
					type += ' tile-whitespace';
				}

  			row.push(<BoardTile tileType ={type} key={j} text = {text} />);
  		}
  		tiles.push(<tr key={i}>{row}</tr>);
  	}

		this.setState({
			board: tiles
		})
	}

  render() {

		return (
			<div className={'view-container'} id={'GameViewContainer'}>
				<div id={'GameBoard'}>
					<table>
						<tbody>
							{this.state.board}
						</tbody>
					</table>
				</div>
				<div id={'GameSidebar'}>
				</div>
				<div id={'GameBottombar'}>
				</div>
			</div>
    );
  }
}
export default GameView;