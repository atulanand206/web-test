import React from 'react';
import "./Sweeper.scss";
import * as State from './State/State';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.disabled || !this.props.gameActive) {
            return;
        }
        switch(e.button) {
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
                style={State.isVisible(this.props.state) ? { backgroundColor: this.props.config.darker } : { backgroundColor: this.props.config.color }}
                className={State.isVisible(this.props.state) ? "cell__visible" : "cell"} 
                onClick={(e) => this.handleClick(e)} 
                onContextMenu={(e) => this.handleClick(e)}>
                {State.isHidden(this.props.state) && <p></p>}
                {State.isVisible(this.props.state) && <p>{this.props.value}</p>}
                {State.isFlagged(this.props.state) && <img src='flag.svg' alt='Flagged cell' />}
                {State.isMined(this.props.state) && <img src='mine.svg' alt='Mined cell' />}
            </div>
        )
    }
}

export default Cell;