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
                <div className='score-container__left'>Score: {this.props.score}</div>
                <div className='score-container__left'>Time: {this.props.time}</div>
                <div className='score-container__right'>Mines Left: {this.props.minesLeft}</div>
            </div>
        )
    }
}

export default Score;