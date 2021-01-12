import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={props.color ? "square-highlight" : "square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square color={this.props.highlight[i]}
                       value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = Game.defaultState()
    }

    static defaultState() {
        return {
            history: [{
                squares: Array(9).fill(null),
                move: null,
            }],
            highlight: Array(9).fill(false),
            stepNumber: 0,
            xIsNext: true,
        };
    }

    shrinkedHistory() {
        return this.state.history.slice(0, this.state.stepNumber + 1);
    }

    player() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    newState(history, square, move, highlight) {
        return {
            history: history.concat([{
                squares: square,
                move: move
            }]),
            highlight: highlight,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        };
    }

    onClick(i) {
        const history = this.shrinkedHistory();
        const square = history[history.length - 1].squares.slice();
        if (calculateWinner(square) || square[i])
            return;
        square[i] = this.player();
        const highlight = Array(9).fill(false);
        const win = calculateWinner(square);
        if (win) {
            for (let i = 0; i < win.length; i++) {
                highlight[win[i]] = true;
            }
        }
        this.setState(this.newState(history, square, [(i / 3 | 0), i % 3], highlight));
    }

    statusString(winner) {
        if (winner)
            return 'Winner:' + this.state.xIsNext ? 'O' : 'X';
        else if (this.state.history.length === 10)
            return 'Match draw';
        else
            return 'Next player: ' + (this.player());
    }

    latestSquare() {
        const history = this.state.history;
        return history[this.state.stepNumber].squares;
    }

    status() {
        return this.statusString(calculateWinner(this.latestSquare()));
    }

    jumpTo(step) {
        this.setState({
            highlight: Array(9).fill(false),
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    moves() {
        console.log(this.latestSquare());
        console.log(this.state.highlight);
        return this.state.history.map((step, move) => {
            const desc = move ? 'Go to move #' + move + " ( " + step.move + " )" : 'Go to game start';
            const res = (move === this.state.stepNumber) ? <strong> {desc} </strong> : desc;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{res}</button>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.latestSquare()}
                           highlight={this.state.highlight}
                           onClick={(i) => this.onClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{this.status()}</div>
                    <ol>{this.moves()}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 8],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return [a, b, c];
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
