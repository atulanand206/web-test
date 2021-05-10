import React from 'react';
import { fetchGames } from './../Server';
import { DateRange } from './../Calculation/TimeRange';
import './Stats.scss';

interface Player {
    name: string
}
interface Game {
    score: number
    times: DateRange[]
    player: Player
}

interface State {
    games: Game[]
    loaded: boolean
}

interface Props {
    config: Object
    isVisible: boolean
}

class Stats extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            games: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetchGames("Beginner", (res: Game[]) => {
            this.setState({games: res, loaded: true});
        });
    }

    render() {
        return (
            <div className={this.props.isVisible && this.state.loaded ? 'stats-container' : 'hidden'}>
                <h4>Leaderboard</h4>
                <div key={-1} className='game-container'>
                    <p>Rank</p>
                    <p>Name</p>
                    <p>Rating</p>
                </div>
                {this.state.games.map((game, i) => {
                    return (
                        <div key={i} className='game-container'>
                            <p>{i+1}</p>
                            <p>{game.player.name}</p>
                            <p>{game.score}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Stats;