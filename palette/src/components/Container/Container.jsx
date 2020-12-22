import React, {Component} from 'react';
import './Container.css';

class Container extends Component {

    start = 1;

    colors = [
        ["#e8a499", "#341C09"],
        ["#ad0f20", "#FFFFFF"],
        ["#FC7307", "#36639f"],
        ["#B37082", "#C3DFD8"],
        ["#641206", "#FC7307"],
        ["#E5B176", "#236AB9"],
        ["#236AB9", "#b1c9c9"],
        ["#a9d7ef", "#fcf749"]
    ];

    constructor(props) {
        super(props);
        this.state = this.setIndex(this.start);
        this.clickAction = this.clickAction.bind(this)
    }

    clickAction() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            let newIndex = this.increment();
            this.setState(this.setIndex(newIndex));
        }, 1000);
    }

    setIndex(newIndex) {
        return {
            index: newIndex,
            styles: {
                backgroundColor: this.colors[newIndex][0]
            },
            textStyle: {
                WebkitTextStrokeColor: this.colors[newIndex][1]
            }
        };
    }

    increment() {
        return (this.state.index + 1) % this.colors.length;
    }

    render = () => {
        return (
            <div className='container' style={this.state.styles} onClick={() => this.clickAction()}>
                <p className='text noselect' style={this.state.textStyle}> Change is everything </p>
            </div>
        );
    };
}

export default Container;