import Base from './Base';

class Calculation {

    emptyBooleanMatrix(cells) {
        return cells.map(x => x.map(y => false));
    }

    isValid(cells, vis, x, y) {
        if (isNaN(x) || isNaN(y) || x === undefined || y === undefined)
            return false;
        if (x < 0 || y < 0 || x >= vis.length || y >= vis[0].length || vis[x][y])
            return false;
        if (cells[x][y].value !== Base.empty)
            return false;
        return cells[x][y].value === Base.empty;
    }

    emptyNeighbourCells(cells, x, y) {
        var visited = this.emptyBooleanMatrix(cells);
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
            Base.directions.map(d => {if (this.isValid(cells, visited, r + d[0], c + d[1])) items.push([r + d[0], c + d[1]]); })
        }
        return selections;
    }

    freeCells(cells, i, j) {
        const selects = this.emptyNeighbourCells(cells, i, j);
        const sls = [];
        selects.map(x => {
            sls.push(x);
            const xx = x[0];
            const xy = x[1];
            Base.directions.map(d => sls.push([xx + d[0], xy - d[1]]));
        });
        const st = cells.map((row, rx) => row.map((col, cx) => { 
            var s = sls.filter(s => s[0] === rx && s[1] === cx);
            if(s.length !== 0) {
                return {disabled: true, value: col.value, hidden: false};
            }
            return col;
        } ));
        return st;
    }

    revealCell(cells, i, j) {
        return cells.map((r, x) => r.map((c, y) => { 
            if (i === x && j === y) 
                return {
                    disabled: true, 
                    value: c.value, 
                    hidden: false
                }; 
            else return c; 
        } ));
    }

    triggerMine(cells, i, j) {
        return cells.map((r, x) => r.map((c, y) => { 
            if (i === x && j === y) 
                return {
                    disabled: true, 
                    value: Base.flag, 
                    hidden: false
                }; 
            else return c; 
        } ));
    }

    calculateScore(cells) {
        var score = 0;
        if (cells !== undefined)
            cells.map(r => r.map(c => {
                if (!c.hidden && c.value.match(Base.numbers) > 0)
                    score += parseInt(c.value);
            }));
        return score;
    }
}

export default Calculation;