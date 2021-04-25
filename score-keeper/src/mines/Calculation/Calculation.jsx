import Base from './../Base';
import Item, { handleState } from './../State/State';
import { emptyBooleanMatrix, isValidForVisitation } from './Calc';
import * as State from './../State/State';
import _ from 'lodash';
class Calculation {

    emptyNeighbourCells(cells, x, y) {
        var visited = emptyBooleanMatrix(cells);
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
            Base.directions.forEach(d => {if (isValidForVisitation(cells, visited, r + d[0], c + d[1])) items.push([r + d[0], c + d[1]]); })
        }
        return selections;
    }

    freeCells(cells, i, j) {
        const selects = this.emptyNeighbourCells(cells, i, j);
        const sls = [];
        selects.forEach(x => {
            sls.push(x);
            const xx = x[0];
            const xy = x[1];
            Base.directions.map(d => sls.push([xx + d[0], xy - d[1]]));
        });
        const st = cells.map((row, rx) => row.map((col, cx) => { 
            var s = sls.filter(s => s[0] === rx && s[1] === cx);
            if(s.length !== 0) {
                return handleState(s, State.SHOW);
            }
            return col;
        } ));
        return st;
    }

    revealCell(cells, i, j) {
        return cells.map((r, x) => r.map((c, y) => { 
            if (i === x && j === y) 
                return handleState(c, State.SHOW);
            else return c; 
        } ));
    }

    revealAll(cells) {
        return cells.map((r, x) => r.map((c, y) => { 
            return handleState(c, State.SHOW);
        } ));
    }

    triggerFlag(cells, i, j) {
        return cells.map((r, x) => r.map((c, y) => { 
            if (i === x && j === y) 
                return handleState(c, State.FLAG); 
            else return c; 
        } ));
    }

    addStart(times) {
        const d = times;
        d.push({ start: new Date() });
        return d;
    }

    addEnd(times) {
        var d = times;
        var data = d[d.length - 1];
        data = { start: data.start, end: new Date() };
        d.pop();
        d.push(data);
        return d;
    }

    format(number) {
        return ('0' + Math.round(number)).slice(-2);
    }

    timeDifferenceString(diff) {
        const diffInSeconds = this.format(diff / (1000));
        const diffInMinutes = this.format(diff / (1000 * 60));
        const diffInHours = this.format(diff / (1000 * 3600));
        return diffInHours + ':' + diffInMinutes + ':' + diffInSeconds;
    }
    
    getTime(times) {
        const diff = times.reduce((ac, time) => {
            if (time.end) ac += (time.end.getTime() - time.start.getTime());
            else ac += (new Date() - time.start.getTime());
            return ac;
        }, 0);
        return this.timeDifferenceString(diff);
    }
}

export default Calculation;