import Base from './../Base';
import { Item, handleState } from './../State/State';
import * as State from './../State/State';

export function minedCells(cells: Item[][], i: number, j: number) {
    return cells.map(row => row.map(col => { if (col.value === Base.mine) return handleState(col, State.MINE); else return col; }));
}

export function calculateScore(cells: Item[][]) {
    var score = 0;
    if (cells !== undefined)
        cells.forEach(r => r.forEach((c:Item) => {
            if (State.isVisible(c.state) && c.value.match(Base.numbers) !== null)
                score += parseInt(c.value);
        }));
    return score;
}