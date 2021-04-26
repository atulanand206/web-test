import React from 'react';
import "./Sweeper.scss";

class Score extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            diffTillNow: 0,
        };
    }
    
    render() {
        return (
            <div className='score-container'>
                <div>Score: {this.props.score}</div>
                <div>Time: {this.props.time}</div>
                <div>Mines Left: {this.props.minesLeft}</div>
            </div>
        )
    }
}

export default Score;