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
        this.props.onConfigChanged(this.configs[config.target.selectedIndex]);
    }

    onLeaderBoardClicked() {
        const visible = !this.state.isStatsVisible;
        this.setState({isStatsVisible: visible});
    }

    render() {
        return (
            <header className='above-all'>
                <div className='logo-container'>
                    <div className='logo-wrapper'></div>
                    <h1 className='logo'><span className='logo__left'>Mine</span>sweeper</h1>
                </div>
                <div className='config-select'>
                    <select className='config-select-selection' onChange={(e) => this.handleClick(e)}>
                        {this.configs.map((config, i) => {
                            return <option className='config-select-option' key={i}>{config.name}</option>
                        })}
                    </select>
                    <span className='config-select-arrow'></span>
                    <img className='nav-icon' src='leaderboard.svg' alt='leaderboard' onClick={() => this.onLeaderBoardClicked()}/>
                </div>
                <Stats isVisible={this.state.isStatsVisible}/>
            </header>
        )
    }
}

export default Header;