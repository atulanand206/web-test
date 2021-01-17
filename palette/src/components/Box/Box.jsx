import React, {Component} from 'react';

class Box extends Component {

    constructor() {
        super();
        this.state = this.setState();
    }

    setState() {
        return {
            imgSrc : "a"
        };
    }
    render = () => {
        return (
            <div className='box'>
                <img />
            </div>
        );
    };
}

export default Box;