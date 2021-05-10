import React from 'react';
import './Sweeper.scss';
import Base from "./Base";
import Cell from './Cell';
import Score from './Score';
import {
    addStart,
    addEnd,
    getTime
} from './Calculation/TimeRange';
import {
    emptyCells,
    minedCells,
    revealCell,
    minesHidden,
    minesLeft,
    calculateScore,
    triggerFlag
} from './Calculation/Calculation';
import Server from './Server';
import Header from './Header/Header';
import Control from './Control';
import Footer from './Footer/Footer';
class Board extends React.Component {

    constructor(props) {
        super(props);
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
            config: Base.configs[0],
            instructions: "Flag all the mines to win."
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.server.fetchBoard(this.config, (data) => {
            this.setState({ cells: data });
        });
    }

    handleClick(e, item, i, j) {
        if (item.value === Base.mine) {
            this.setState({ 
                mineHit: true, 
                instructions: "You played well, you just weren't lucky enough!",
                cells: minedCells(this.state.cells, i, j) 
            });
            this.pause();
        } else if (item.value === Base.empty) {
            this.setState({ cells: emptyCells(this.state.cells, i, j) });
        } else {
            this.setState({ cells: revealCell(this.state.cells, i, j) });
        }
        this.isFinished();
    }

    onMineIdentify(e, item, i, j) {
        const mines = minesLeft(this.state.cells, this.state.config.mines);
        this.setState({
            cells: triggerFlag(this.state.cells, i, j),
            minesLeft: mines
        });
        this.isFinished();
    }

    isFinished() {
        if (!this.state.mineHit && minesHidden(this.state.cells) === 0) {
            this.setState({ 
                // cells: showNumberCells(this.state.cells),
                instructions: "You are the master, keep conquering."
            });
            this.pause();
            // this.save();
        }
        if (this.state.mineHit) {
            // this.save();
        }
        this.save();
    }

    onResetBoard(config) {
        this.setState({ config: config });
        this.server.fetchBoard(config, (data) => this.setState({
            cells: data,
            minesLeft: config.mines,
            mineHit: false,
            instructions: "Flag all the mines to win."
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
        this.setState({ time: getTime(this.state.times) });
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
                times: addStart(this.state.times),
                gameActive: true
            });
            this.startTimer();
        }
    }

    pause() {
        if (this.state.gameActive) {
            this.setState({
                times: addEnd(this.state.times),
                gameActive: false
            });
            this.stopTimer();
        }
    }

    save() {
        this.server.saveGame({
            config: this.state.config,
            times: this.state.times,
            score: calculateScore(this.state.cells),
            won: !this.state.mineHit && this.state.minesLeft === 0,
            finished: (!this.state.mineHit && this.state.minesLeft === 0) || this.state.mineHit
        })
    }

    render() {
        return (
            <div className='container'>
                <Header className='main-header'
                    onConfigChanged={(config) => this.onResetBoard(config)} />
                <main>
                    {<Score
                        score={calculateScore(this.state.cells)}
                        minesLeft={minesLeft(this.state.cells, this.state.config.mines, this.state.mineHit)}
                        times={this.state.times}
                        time={this.state.time} />}
                    {<Control
                        play={() => this.play()}
                        pause={() => this.pause()}
                        gameActive={this.state.gameActive} />}
                    <br />
                    <h3>{this.state.instructions}</h3>
                    <div className='board'>
                        {this.state.cells.map((element, i) => {
                            return <div className="row-container" key={i}> {element.map((em, j) => {
                                return <Cell key={i + " " + j} value={em.value} state={em.state}
                                    gameActive={this.state.gameActive}
                                    config={this.state.config}
                                    mineHit={this.state.mineHit} disabled={em.disabled}
                                    onClick={(e) => this.handleClick(e, em, i, j)}
                                    onMineIdentify={(e) => this.onMineIdentify(e, em, i, j)} />
                            })}
                            </div>
                        })}
                    </div>
                </main>
                <Footer className='main-footer'/>
            </div>
        )
    }
}

export default Board;