import React, {Component} from 'react';
import SecondHand from './svg/hand';

class Clock extends Component {

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

    constructor() {
        super();
        this.state = {
            containerStyle: {
                padding: 20,
                margin: 20,
                width: 100,
                height: 100,
                position: 'relative'
            },
            circleStyle: {
                display: "inline-block",
                backgroundColor: this.colors[1][0],
                border: "dashed #FFF",
                borderRadius: "50%",
                width: 100,
                height: 100,
                position: 'absolute',
                top: 0,
                left: 0,
            },
            handStyle: {
                display: "inline",
                backgroundColor: this.colors[5][0],
                stroke: '4px',
                width: 2,
                height: 50,
                position: 'absolute',
                top: 50,
                left: 50,
                zIndex:5
            },
            time: new Date()
        };
    }

    // canvas = this.ref;
    // drawClock = () => {
    //     const canvasEle = this.canvas.current;
    //     canvasEle.width = canvasEle.clientWidth;
    //     canvasEle.height = canvasEle.clientHeight;
    //     let ctx = canvasEle.getContext("2d");
    //
    //     this.drawLine({x: 50, y: 50, x1: 25, y1: 25}, ctx);
    // };

    drawSvg = () => {
        let dt = new Date();
        var secondHand = SecondHand(dt);
        console.log('test');
        console.log(secondHand);
    };

    drawLine = (info, style = {}, ctx) => {
        const {x, y, x1, y1} = info;
        const {color = 'black', width = 1} = style;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    };

    render = () => {
        return (
            <div className='clock' style={this.state.containerStyle}>
                <div className='second-hand' style={this.state.handStyle}/>
                <div className='clock-face' style={this.state.circleStyle} onClick={() => this.drawSvg}/>

                {/*<canvas ref={this.canvas}/>*/}
            </div>
        );
    };
}

export default Clock;