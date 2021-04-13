import React from 'react';
import './App.css';
import MatTable from "./Table";
import Board from "./Sweeper";

class Turn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }
}

class Ball extends Turn {

    constructor(props) {
        super(props);
        this.state = {
            number: props.value[0],
            color: props.value[1],
            style: {
                backgroundColor: props.value[1]
            },
            textStyle: {
                color: props.value[2]
            },
            borderStyle: {}
        }
    }

    render() {
        return (
            <div className="Ball" style={this.state.style}>
                <div className={this.state.number > 8 ? "strip" : ""}/>
                <div className="center text" style={this.state.textStyle}>{this.state.number}</div>
                <div className="outline" style={this.state.borderStyle}/>
            </div>
        )
    }
}

class Other extends Turn {

    render() {
        return (
            <div>
                {this.props.value}
            </div>
        )
    }
}

class Game extends React.Component {

    balls = [
        [0, "#FDFD97", "#000"],
        [1, "#FDFD97", "#000"],
        [2, "#1B73D3", "#FFF"],
        [3, "#CC2936", "#FFF"],
        [4, "#010079", "#FFF"],
        [5, "#FC7307", "#FFF"],
        [6, "#0a6c03", "#FFF"],
        [7, "#621D1E", "#FFF"],
        [8, "#000", "#FFF"],
        [9, "#FDFD97", "#000"],
        [10, "#1B73D3", "#000"],
        [11, "#CC2936", "#000"],
        [12, "#010079", "#000"],
        [13, "#FC7307", "#000"],
        [14, "#0a6c03", "#000"],
        [15, "#621D1E", "#000"],
    ];

    constructor(props) {
        super(props);
        this.state = {
            turns: [this.balls[0]]
        }
    }

    renderOtherTurn(value) {
        return <Other value={value ? "Valid" : "Foul"}/>
    }

    renderBallTurn(value) {
        return <Ball value={value}/>
    }

    renderTurns() {
        return this.state.forEach(turn => {
            return <div>{this.renderBallTurn(turn)}</div>;
        });
    }

    render() {
        return (
            <div>
                <div>{this.renderBallTurn(this.balls[1])}</div>
                <div>{this.renderBallTurn(this.balls[2])}</div>
                <div>{this.renderBallTurn(this.balls[3])}</div>
                <div>{this.renderBallTurn(this.balls[4])}</div>
                <div>{this.renderBallTurn(this.balls[5])}</div>
                <div>{this.renderBallTurn(this.balls[6])}</div>
                <div>{this.renderBallTurn(this.balls[7])}</div>
                <div>{this.renderBallTurn(this.balls[8])}</div>
                <div>{this.renderBallTurn(this.balls[9])}</div>
                <div>{this.renderBallTurn(this.balls[10])}</div>
                <div>{this.renderBallTurn(this.balls[11])}</div>
                <div>{this.renderBallTurn(this.balls[12])}</div>
                <div>{this.renderBallTurn(this.balls[13])}</div>
                <div>{this.renderBallTurn(this.balls[14])}</div>
                <div>{this.renderBallTurn(this.balls[15])}</div>
                <div>{this.renderOtherTurn(false)}</div>
                <div>{this.renderOtherTurn(true)}</div>
            </div>
        )
    }
}

function App() {
    return (
        <div className="App">
            <Board/>
            {/* <MatTable/> */}
        </div>
    );
}

export default App;
