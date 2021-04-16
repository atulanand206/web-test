import React from 'react';
import "./Sweeper.scss";
import Base from "./Base";

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.disabled) {
            return;
        }
        switch(e.button) {
            case 0: this.props.onClick();
                    break;
            case 2: if (this.props.value === Base.mine) this.props.onMineIdentify();
                    break;
            default:
                    break;
        }
    }

    isVisible() {
        return (!this.props.hidden) || this.props.value === Base.flag 
                || (this.props.mineHit && this.props.value === Base.mine);
    }

    render() {
        return (
            <div 
                style={this.isVisible() ? { backgroundColor: this.props.config.darker } : { backgroundColor: this.props.config.color }}
                className={this.isVisible()? "cell__visible" : "cell"} 
                onClick={(e) => this.handleClick(e)} 
                onContextMenu={(e) => this.handleClick(e)}>
                <p>{this.isVisible() ? this.props.value :  ""}</p>
            </div>
        )
    }
}

export default Cell;