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

export function emptyNeighbourCells(cells: Item[][], x: number, y: number): number[][] {
    var visited = emptyBooleanMatrix(cells);
    const selections: number[][] = [];
    const items: number[][] = [];
    items.push([x, y]);
    while (items.length !== 0) {
        const curr: number[] = items.pop() || [];
        const r = curr[0];
        const c = curr[1];
        visited = visited.map((v, i) => v.map((w, j) => { if (i === r && j === c) return true; else return w; }));
        var s = selections.filter(s => s[0] === r && s[1] === c);
        if (s.length === 0)
            selections.push([r, c]);
        Base.directions.forEach(d => { if (isValidForVisitation(cells, visited, r + d[0], c + d[1])) items.push([r + d[0], c + d[1]]); })
    }
    return selections;
};

export function emptyCells(cells: Item[][], i: number, j: number) {
    const selects = emptyNeighbourCells(cells, i, j);
    const sls: number[][] = [];
    selects.forEach((x: number[]) => {
        sls.push(x);
        const xx = x[0];
        const xy = x[1];
        Base.directions.map(d => sls.push([xx + d[0], xy - d[1]]));
    });
    const st = cells.map((row, rx) => row.map((col, cx) => {
        var s = sls.filter((s: number[]) => s[0] === rx && s[1] === cx);
        if (s.length !== 0) {
            return handleState(cells[s[0][0]][s[0][1]], State.SHOW);
        }
        return col;
    }));
    return st;
}

export function revealCell(cells: Item[][], i: number, j: number) {
    return cells.map((r, x) => r.map((c, y) => {
        if (i === x && j === y)
            return handleState(c, State.SHOW);
        else return c;
    }));
}

export function triggerFlag(cells: Item[][], i: number, j: number) {
    return cells.map((r, x) => r.map((c, y) => {
        if (i === x && j === y)
            return handleState(c, State.FLAG);
        else return c;
    }));
}

export function showNumberCells(cells: Item[][]) {
    return cells.map(row => row.map(col => { if (col.value.match(Base.numbers) !== null) return handleState(col, State.SHOW); return col; }));
}

export function minedCells(cells: Item[][], i: number, j: number) {
    return cells.map(row => row.map(col => { if (col.value === Base.mine) return handleState(col, State.MINE); return col; }));
}

export function minesHidden(cells: Item[][]) {
    return cells.reduce((acc: number, r: Item[]) => r.reduce((ac: number, c: Item) => {
        if (State.isHidden(c.state) && c.value === Base.mine) return ac + 1; return ac;
    }, acc), 0);
}

export function minesLeft(cells: Item[][], totalMines: number, mineHit: boolean) {
    if (mineHit) return 0;
    return totalMines - cells.reduce((acc: number, r: Item[]) => r.reduce((ac: number, c: Item) => {
        if (State.isFlagged(c.state)) return ac + 1; return ac;
    }, acc), 0);
}

export function calculateScore(cells: Item[][]) {
    if (cells === undefined) return 0;
    return cells.reduce((acc: number, r: Item[]) => r.reduce((ac: number, c: Item) => {
        if (State.isVisible(c.state) && c.value.match(Base.numbers) !== null) return ac + parseInt(c.value); return ac;
    }, acc), 0)
}