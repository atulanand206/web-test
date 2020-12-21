import React, {Component} from 'react';
import "./Timer.css"
import TimerButton from "../TimerButton/TimerButton";

class Timer extends Component {
    defaultMinutes = 25;
    defaultSeconds = 0;

    constructor() {
        super();
        this.state = {
            minutes: this.defaultMinutes,
            seconds: this.defaultSeconds,
            isOn: false
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    setDefaults(minutes, seconds) {
        this.defaultMinutes = minutes;
        this.defaultSeconds = seconds;
        this.resetTimer()
    }

    startTimer() {
        this.setState({
            isOn: true,
        });
        clearInterval(this.timeOut);
        this.timeOut = setInterval(() => {
            const {seconds, minutes} = this.state;
            if (Timer.isTimerOver(seconds, minutes)) {
                clearInterval(this.timeOut);
                return
            }
            this.decrementSecond(seconds, minutes);
        }, 1000);
    }

    static isTimerOver(seconds, minutes) {
        return seconds === 0 && minutes === 0;
    }

    decrementSecond(seconds, minutes) {
        if (seconds > 0) {
            this.whenSecondsIsNonZero(seconds);
        } else {
            this.whenSecondsIsZero(minutes);
        }
    }

    whenSecondsIsNonZero(seconds) {
        this.setState({
            seconds: seconds - 1
        });
    }

    whenSecondsIsZero(minutes) {
        this.setState({
            minutes: minutes - 1,
            seconds: 59
        });
    }

    stopTimer() {
        this.setState({
            isOn: false
        });
        clearInterval(this.timeOut);
    }

    resetTimer() {
        this.stopTimer();
        this.setState({
            isOn: false,
            minutes: this.defaultMinutes,
            seconds: this.defaultSeconds
        });
    }

    componentDidUpdate() {
    }

    renderText() {
        return this.state.minutes + " minutes : " + this.state.seconds + " seconds";
    }

    render = () => {
        return (
            <div className='timer-container'>
                <div className="time-display">
                    {this.renderText()}
                </div>
                <div className={"timer-button-container"}>
                    <TimerButton className="start-timer" buttonAction={this.startTimer} buttonValue={"Start"}/>
                    <TimerButton className="stop-timer" buttonAction={this.stopTimer} buttonValue={"Stop"}/>
                    <TimerButton className="reset-timer" buttonAction={this.resetTimer} buttonValue={"Reset"}/>
                </div>
            </div>
        );
    };
}

export default Timer;