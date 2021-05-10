import React from 'react';
import "./Sweeper.scss";
import * as State from './State/State';
import {isMobile} from 'react-device-detect';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    isLow() {
        return isMobile;
    }

    isDisabled() {
        return this.props.disabled || !this.props.gameActive;
    }

    handleClick(e) {
        console.log(e.target);
        e.preventDefault();
        if (this.isDisabled()) {
            return;
        }
        this.act(e.button);
    }

    onOptionSelected(e) {
        console.log(e.target.selectedIndex);
        e.preventDefault();
        switch(e.target.selectedIndex){
            case 1: this.act(0); break;
            case 2: this.act(2); break;
        }
    }

    act(keyCode) {
        switch (keyCode) {
            case 0: this.props.onClick();
                break;
            case 2: this.props.onMineIdentify();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div
                style={State.isVisible(this.props.state) || State.isMined(this.props.state) ? { backgroundColor: this.props.config.darker } : { backgroundColor: this.props.config.color }}
                className={State.isVisible(this.props.state) ? "cell__visible" : "cell"}
                onClick={(e) => !this.isLow() && this.handleClick(e)}
                onContextMenu={(e) => this.handleClick(e)}>
                <select className={this.isLow() && State.isHidden(this.props.state) ? 'cell-click' : 'hidden'}
                    onChange={(e) => this.onOptionSelected(e)}
                    disabled={this.isDisabled()}>
                    <option key='choose'></option>
                    <option key='open'>Open</option>
                    <option key='flag'>Flag</option>
                </select>
                {State.isHidden(this.props.state) && <p></p>}
                {State.isVisible(this.props.state) && <p>{this.props.value}</p>}
                {State.isFlagged(this.props.state) && <img className='icon-container' src='flag.svg' alt='Flagged cell' />}
                {State.isMined(this.props.state) && <img className='icon-container' src='mine.svg' alt='Mined cell' />}
            </div>
        )
    }
}

export default Cell;