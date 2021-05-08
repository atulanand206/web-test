import React from 'react';
import './Navigation.scss';
import Stats from './../Stats/Stats';
import './../Sweeper.scss';
import Base from '../Base';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.configs = Base.configs
        this.state = {
            isStatsVisible: false
        }
    }

    handleClick(config) {
        this.props.onConfigChanged(config);
    }

    onLeaderBoardClicked() {
        const visible = !this.state.isStatsVisible;
        this.setState({isStatsVisible: visible});
    }

    render() {
        return (
            <header className='above-all'>
                <h1 className='logo'><span className='logo__left'>Mine</span>sweeper</h1>
                <input type='checkbox' id='nav-toggle' className='nav-toggle' />
                <label for='nav-toggle' className='nav-toggle-label'><span></span></label>
                <nav className='nav-container'>
                    <ul>
                        {this.configs.map((config, i) => {
                            return <li key={i} onClick={() => this.handleClick(config)}>{config.name}</li>
                        })}
                    </ul>
                </nav>
                <img className='nav-icon' src='leaderboard.svg' onClick={() => this.onLeaderBoardClicked()}/>
                <Stats isVisible={this.state.isStatsVisible}/>
            </header>
        )
    }
}

export default Header;