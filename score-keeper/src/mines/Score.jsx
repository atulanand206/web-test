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
                <h4>Score<br/>{this.props.score}</h4>
                <h4>Time<br/>{this.props.time}</h4>
                <h4>Mines Left<br/>{this.props.minesLeft}</h4>
            </div>
        )
    }
}

export default Score;