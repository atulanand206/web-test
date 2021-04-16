import React from 'react';
import "./Sweeper.scss";

class Score extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: '00:00:00',
            startTime: props.startTime
        };
    }

    format(number) {
        return ('0' + Math.round(number)).slice(-2);
    }

    getTime() {
        const now = new Date();
        const diff = (now.getTime() - this.state.startTime.getTime());
        const diffInSeconds = this.format(diff / (1000));
        const diffInMinutes = this.format(diff / (1000 * 60));
        const diffInHours = this.format(diff / (1000 * 3600));
        return diffInHours + ':' + diffInMinutes + ':' + diffInSeconds;
    }

    updateTime() {
        this.setState({time: this.getTime()});
    }

    startTimer() {
        setInterval(() => { this.updateTime(); }, 1000);
    }

    componentDidMount() {
        this.startTimer();
    }

    render() {
        return (
            <div className='score-container'>
                <div className='score-container__left'>{this.props.score}</div>
                <div className='score-container__left'>{this.state.time}</div>
                <div className='score-container__right'>{this.props.minesLeft}</div>
            </div>
        )
    }
}

export default Score;