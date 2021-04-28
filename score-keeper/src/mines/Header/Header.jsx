import React from 'react';
import './Navigation.scss';
import './../Sweeper.scss';
import Base from '../Base';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.configs = Base.configs
    }

    handleClick(config) {
        this.props.onConfigChanged(config);
    }

    render() {
        return (
            <header className='above-all'>
                <h1 class='logo'><span className='logo__left'>Mine</span>sweeper</h1>
                <input type='checkbox' id='nav-toggle' className='nav-toggle' />
                <label for='nav-toggle' className='nav-toggle-label'><span></span></label>
                <nav className='nav-container'>
                    <ul>
                        {this.configs.map((config, i) => {
                            return <li key={i} onClick={() => this.handleClick(config)}>{config.name}</li>
                        })}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;