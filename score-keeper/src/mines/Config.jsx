import React from 'react';
import './Sweeper.scss';
import Base from './Base';

class Config extends React.Component {

    constructor(props) {
        super(props);
        this.configs = Base.configs
    }

    handleClick(config) {
        this.props.onConfigChanged(config);
    }

    render() {
        return (
            <div className='config-container'>
                {this.configs.map((config, i) => {
                    return <div className='control-item' key={i} onClick={() => this.handleClick(config)} >{config.name}</div>
                })}
            </div>
        )
    }
}

export default Config;