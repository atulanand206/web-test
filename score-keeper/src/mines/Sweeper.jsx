import React from 'react';
import './Sweeper.scss';
import Base from "./Base";
import Cell from './Cell';
import Score from './Score';
import Calculation from './Calculation';
import Server from './Server';
import Config from './Config';
import Control from './Control';
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.calculation = new Calculation(); 
        this.server = new Server();
        this.config = Base.configs[0];
        this.state = {
            cells: [],
            mineHit: false,
            score: 0,
            times: [],
            time: '00:00:00',
            minesLeft: this.config.mines,
            gameActive: false,
            config: Base.configs[0]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.server.fetchBoard(this.config, (data) => this.setState({cells: data }));
    }

    handleClick(e, item, i, j) {
        if (item === Base.mine) {
            this.setState({ mineHit: true });
            this.pause();
        } else if (item === Base.empty) {
            this.setState({ cells: this.calculation.freeCells(this.state.cells, i, j) });
        } else {
            this.setState({ cells: this.calculation.revealCell(this.state.cells, i, j) });
        }
    }

    onMineIdentify(e, item, i, j) {
        const minesLeft = this.state.minesLeft - 1;
        this.setState({
            cells: this.calculation.triggerMine(this.state.cells, i, j), 
            minesLeft: minesLeft
        });
    }

    onResetBoard(config) {
        this.setState({ config: config });
        this.server.fetchBoard(config, (data) => this.setState({ 
            cells: data, 
            minesLeft: config.mines, 
            mineHit: false,
        }));
        this.pause();
        this.resetTimer();
    }

    resetTimer() {
        this.setState({
            times: [],
            time: '00:00:00'
        })
    }

    updateTime() {
        this.setState({time: this.calculation.getTime(this.state.times)});
    }

    startTimer() {
        this.interval = setInterval(() => { this.updateTime(); }, 1000);
    }

    stopTimer() {
        if (this.interval) clearInterval(this.interval);
    }

    play() {
        if (!this.state.gameActive && !this.state.mineHit) {
            this.setState({
                times: this.calculation.addStart(this.state.times), 
                gameActive: true
            });
            this.startTimer();
        }
    }
    
    pause() {
        if (this.state.gameActive) {
            this.setState({
                times: this.calculation.addEnd(this.state.times), 
                gameActive: false});
            this.stopTimer();
        }
    }

    render() {
        return ( 
            <div>
                <br/>
                {<Config 
                    onConfigChanged={(config) => this.onResetBoard(config)} />}
                {<Score 
                    score={this.calculation.calculateScore(this.state.cells)} 
                    minesLeft={this.state.minesLeft} 
                    times={this.state.times}
                    time={this.state.time}/>}
                {<Control
                    play={() => this.play()}
                    pause={() => this.pause()} 
                    gameActive={this.state.gameActive}/>}
                <br/>
                {this.state.cells.map((element, i) => {
                        return <div className="row-container" key={i}> {element.map((em, j)=> {
                            return <Cell key={i + " " + j} value={em.value} hidden={em.hidden}
                                        gameActive={this.state.gameActive}
                                        config={this.state.config}
                                        mineHit={this.state.mineHit} disabled={em.disabled}
                                        onClick={(e) => this.handleClick(e, em.value, i, j)}
                                        onMineIdentify={(e) => this.onMineIdentify(e, em, i, j)}/>
                        })} 
                        </div> 
                    })
                }
            </div> 
        )
    }
}

export default Board;