import React, {Component} from 'react';
import './Container.css';
import Clock from "../clock/Clock";

class Container extends Component {

    render = () => {
        return (
            <div className='container'>
                <Clock/>
                <Clock/>
                <Clock/>
            </div>
        );
    };
}

export default Container;