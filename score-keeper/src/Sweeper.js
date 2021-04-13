import React from 'react';
import "./Sweeper.scss";

const mine = '?'
const empty = ' '
const flag = '@'
const row = 20
const col = 20
const mines = 100

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.disabled) {
            return;
        }
        switch(e.button) {
            case 0: this.props.onClick();
                    break;
            case 2: if (this.props.value === mine) {
                        this.props.onMineIdentify();
                    }
                    break;
        }
    }

    isVisible() {
        return (!this.props.hidden) || this.props.value === flag || (this.props.mineHit && this.props.value === mine);
    }

    render() {
        return (
            <div className={this.isVisible()? "cell__visible" : "cell"} onClick={(e) => this.handleClick(e)} onContextMenu={(e) => this.handleClick(e)}>
                <p>{this.isVisible() ? this.props.value :  ""}</p>
            </div>
        )
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: [],
            mineHit: false,
            visited: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    emptyBooleanMatrix(cells) {
        return cells.map(x => x.map(y => false));
    }

    componentDidMount() {
        this.fetchBoard();
    }

    fetchBoard() {
        fetch(`http://localhost:5000/game/new?rows=${row}&columns=${col}&mines=${mines}`)
        .then(response => response.json())
        .then(data => {
            data = data.map((r, i) => r.map((c, j) => { return {disabled: false, value: c, hidden: true} } ));
            console.log(data);
            this.setState({cells: data, visited: this.emptyBooleanMatrix(data)});
        });
    }

    isValid(cells, vis, x, y) {
        if (isNaN(x) || isNaN(y) || x === undefined || y === undefined)
            return false;
        if (x < 0 || y < 0 || x >= vis.length || y >= vis[0].length || vis[x][y])
            return false;
        if (cells[x][y].value !== empty)
            return false;
        return cells[x][y].value === empty;
    }

    cellsToMakeVisible(cells, x, y) {
        var visited = this.state.visited;
        const selections = [];
        const items = [];
        items.push([x, y]);
        while (items.length !== 0) {
            const curr = items.pop();
            const r = curr[0];
            const c = curr[1];
            visited = visited.map((v, i) => v.map((w, j) => { if (i === r && j === c ) return true; else return w; }));
            var s = selections.filter(s => s[0] === r && s[1] === c);
            if (s.length === 0)
                selections.push([r, c]);
            if (this.isValid(cells, visited, r - 1, c - 1)) items.push([r - 1, c - 1]);
            if (this.isValid(cells, visited, r - 1, c)) items.push([r - 1, c]);
            if (this.isValid(cells, visited, r - 1, c + 1)) items.push([r - 1, c + 1]);
            if (this.isValid(cells, visited, r, c - 1)) items.push([r, c - 1]);
            if (this.isValid(cells, visited, r, c + 1)) items.push([r, c + 1]);
            if (this.isValid(cells, visited, r + 1, c - 1)) items.push([r + 1, c - 1]);
            if (this.isValid(cells, visited, r + 1, c)) items.push([r + 1, c]);
            if (this.isValid(cells, visited, r + 1, c + 1)) items.push([r + 1, c + 1]);
        }
        return selections;
    }

    handleClick(e, item, i, j) {
        if (item === mine) {
            this.setState({mineHit: true});
        } else if (item === empty) {
            var cells = this.state.cells;
            const selects = this.cellsToMakeVisible(cells, i, j);
            const st = cells.map((row, rx) => row.map((col, cx) => { 
                var s = selects.filter(s => s[0] === rx && s[1] === cx);
                if(s.length !== 0) {
                    return {disabled: true, value: col.value, hidden: false};
                }
                return col;
            } ));
            this.setState({cells: st});
        } else {
            const st = this.state.cells.map((r, x) => r.map((c, y) => { if (i === x && j === y) return {disabled: true, value: c.value, hidden: false}; else return c; } ));
            this.setState({cells: st});
        }
    }

    onMineIdentify(e, item, i, j) {
        const st = this.state.cells.map((r, x) => r.map((c, y) => { if (i === x && j === y) return {disabled: true, value: flag, hidden: false}; else return c; } ));
        this.setState({cells: st});
    }

    render() {
        return (
            <div>
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