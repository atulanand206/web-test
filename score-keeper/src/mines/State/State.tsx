import _ from 'lodash';

export interface Item {
    value: string;
    state: string;
    disabled: boolean;
}

export const HIDDEN: string = "HIDDEN";
export const VISIBLE: string = "VISIBLE";
export const FLAGGED: string = "FLAGGED";
export const MINED: string = "MINED";

export const FLAG: string = "FLAG";
export const SHOW: string = "SHOW";
export const MINE: string = "MINE";
export const STOP: string = "STOP";

function handleHidden(item: Item, action: string) {
    let state: string = item.state;
    let disabled: boolean = item.disabled;
    switch (action) {
        case (FLAG): state = FLAGGED; break;
        case (SHOW): state = VISIBLE; disabled = true; break;
        case (MINE): state = MINED; disabled = true; break;
    }
    return _.merge(item, { state: state, disabled: disabled });
}

function handleFlagged(item: Item, action: string) {
    let state: string = item.state;
    let disabled: boolean = item.disabled;
    switch (action) {
        case (SHOW): state = VISIBLE; disabled = true; break;
        case (MINE): state = MINED; disabled = true; break;
    }
    return _.merge(item, { state: state, disabled: disabled });
}

export function handleState(item: Item, action: string) {
    if (item.disabled) return item;
    if (action === STOP) item = _.merge(item, { disabled: true });
    switch (item.state) {
        case (HIDDEN): return handleHidden(item, action);
        case (VISIBLE): return item;
        case (FLAGGED): return handleFlagged(item, action);
        case (MINED): return item;
    }
}

export function isHidden(state: string): boolean {
    return state === HIDDEN;
}

export function isVisible(state: string): boolean {
    return state === VISIBLE;
}

export function isFlagged(state: string): boolean {
    return state === FLAGGED;
}

export function isMined(state: string): boolean {
    return state === MINED;
}