import React, {Component} from 'react'
import Square from './Square'

export default class Board extends Component {
	constructor(props) {
		super(props)

		this.state = {
			squares: Array(9).fill(null),
			isXTurn: true,
			element: '',
			winner: false
		}
	}

	onSquareClick(index) {
		const squares = [...this.state.squares];
		if (squares[index] == null && this.state.winner == false) {
			squares[index] = this.state.isXTurn ? 'X' : '0'
			this.setState({
				squares,
				isXTurn: !this.state.isXTurn
			})

			if (this.gameplay(squares) != null) {

				this.state.winner = true;
				this.state.element = this.gameplay(squares);
			}
		}
	}

	gameplay(squares) {
		const checkpoints = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < checkpoints.length; i++) {
			const [a, b, c] = checkpoints[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
	}

	render() {
		return <div className="board">
			{
				this.state.squares.map(
					(value, index) => <Square key={index}
						value={value}
						onSquareClick={() => this.onSquareClick(index)}
					/>)
			}
			<h1>{this.state.element != '' ? "The winner is " + this.state.element : null} </h1>
		</div>
	}
}