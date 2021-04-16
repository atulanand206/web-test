import React from 'react';
import './Sweeper.scss';
import Base from "./Base";
import Cell from './Cell';
import Score from './Score';
import Calculation from './Calculation';
import Server from './Server';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.calculation = new Calculation(); 
        this.server = new Server();
        this.config = { row: Base.row, col: Base.col, mines: Base.mines };
        this.state = {
            cells: [],
            mineHit: false,
            score: 0,
            minesLeft: Base.mines,
            startTime: new Date(),
            gameStarted: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.server.fetchBoard(this.config, (data) => this.setState({cells: data }));
    }

    handleClick(e, item, i, j) {
        if (!this.state.gameStarted) this.setState({ startTime: new Date() , gameStarted: true });
        if (item === Base.mine) {
            this.setState({mineHit: true});
        } else if (item === Base.empty) {
            this.setState({ cells: this.calculation.freeCells(this.state.cells, i, j) });
        } else {
            this.setState({ cells: this.calculation.revealCell(this.state.cells, i, j) });
        }
    }

    onMineIdentify(e, item, i, j) {
        this.setState({
            cells: this.calculation.triggerMine(this.state.cells, i, j), 
            minesLeft: this.state.minesLeft - 1
        });
    }

    render() {
        return (
            <div>
                {<Score 
                    score={this.calculation.calculateScore(this.state.cells)} 
                    minesLeft={this.state.minesLeft} 
                    startTime={this.state.startTime} />}
                {this.state.cells.map((element, i) => {
                        return <div className="row-container" key={i}> {element.map((em, j)=> {
                            return <Cell key={i + " " + j} value={em.value} hidden={em.hidden}
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