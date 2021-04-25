import React from 'react';
import './Sweeper.scss';
import Base from "./Base";
import Cell from './Cell';
import Score from './Score';
import Calculation from './Calculation/Calculation';
import { minedCells, calculateScore } from './Calculation/Calc';
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
        this.server.fetchBoard(this.config, (data) => {
            this.setState({cells: data });
            console.log(JSON.stringify(data));
        });
    }

    handleClick(e, item, i, j) {
        console.log(item);
        if (item.value === Base.mine) {
            this.setState({ mineHit: true, cells: minedCells(this.state.cells, i, j) });
            this.pause();
        } else if (item.value === Base.empty) {
            this.setState({ cells: this.calculation.freeCells(this.state.cells, i, j) });
        } else {
            this.setState({ cells: this.calculation.revealCell(this.state.cells, i, j) });
        }
        this.isFinished();
    }

    onMineIdentify(e, item, i, j) {
        const minesLeft = this.state.minesLeft - 1;
        this.setState({
            cells: this.calculation.triggerFlag(this.state.cells, i, j), 
            minesLeft: minesLeft
        });
        this.isFinished();
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

    isFinished() {
        console.log(this.state.mineHit);
        if (!this.state.mineHit && this.state.minesLeft === 0) {
            this.pause();
            this.setState({
                cells: this.calculation.revealAll(this.state.cells)
            });
        }
        this.save();
    }

    save() {
        this.server.saveGame({
            config: this.state.config,
            times: this.state.times,
            score: calculateScore(this.state.cells),
            won: !this.state.mineHit && this.state.minesLeft === 0
        })
    }

    render() {
        return ( 
            <div>
                <br/>
                {<Config 
                    onConfigChanged={(config) => this.onResetBoard(config)} />}
                {<Score 
                    score={calculateScore(this.state.cells)} 
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
                            return <Cell key={i + " " + j} value={em.value} state={em.state}
                                        gameActive={this.state.gameActive}
                                        config={this.state.config}
                                        mineHit={this.state.mineHit} disabled={em.disabled}
                                        onClick={(e) => this.handleClick(e, em, i, j)}
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