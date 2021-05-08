import React from 'react';
import Server, { fetchGames } from './../Server';
import { DateRange } from './../Calculation/TimeRange';
import './Stats.scss';

interface Game {
    score: number
    times: DateRange[]
}

interface State {
    games: Game[]
}

interface Props {
    config: Object
    isVisible: boolean
}

class Stats extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentWillMount() {
        fetchGames("Beginner", (res: Game[]) => {
            this.setState({games: res});
        });
    }

    render() {
        console.log(this.state.games);
        return (
            <div className={this.props.isVisible ? 'stats-container' : 'stats-container-hidden'}>
                {this.state.games.map(game => {
                    return (
                        <div className='game-container'>
                            <p>{game.score}</p>
                            <p>{game.times[0].start}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Stats;