import Base from './../Base';
import { Item, handleState } from './../State/State';
import * as State from './../State/State';

export function emptyBooleanMatrix(cells: Item[][]) {
    return cells.map((x: Item[]) => x.map((y: Item) => false));
}

export function isValidForVisitation(cells: Item[][], vis: boolean[][], x: number, y: number) {
    if (isNaN(x) || isNaN(y) || x === undefined || y === undefined)
        return false;
    if (x < 0 || y < 0 || x >= vis.length || y >= vis[0].length || vis[x][y])
        return false;
    if (cells[x][y].value !== Base.empty)
        return false;
    return cells[x][y].value === Base.empty;
}

export function minedCells(cells: Item[][], i: number, j: number) {
    return cells.map(row => row.map(col => { if (col.value === Base.mine) return handleState(col, State.MINE); return col; }));
}

export function calculateScore(cells: Item[][]) {
    if (cells === undefined) return 0;
    return cells.reduce((acc: number, r: Item[]) => r.reduce((ac: number, c:Item) => {
        if (State.isVisible(c.state) && c.value.match(Base.numbers) !== null) return ac + parseInt(c.value); return ac;
    }, acc) , 0)
}