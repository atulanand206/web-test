import { Item } from './Base';
import _ from 'lodash';

export const HIDDEN: string = "HIDDEN";
export const VISIBLE: string = "VISIBLE";
export const FLAGGED: string = "FLAGGED";
export const MINED: string = "MINED";

export const FLAG: string = "FLAG";
export const SHOW: string = "SHOW";
export const MINE: string = "MINE";

function handleHidden(item: Item, action: string) {
    let state = item.state;
    switch (action) {
        case (FLAG): state = FLAGGED; break;
        case (SHOW): state = VISIBLE; break;
        case (MINE): state = MINED; break;
    }
    return _.merge(item, { state: state, disabled: true });
}

function handleVisible(item: Item, action: string) {
    return _.merge(item, { state: VISIBLE, disable: true });
}

function handleFlagged(item: Item, action: string) {
    let state: string = item.state;
    switch (action) {
        case (SHOW): state = VISIBLE; break;
        case (MINE): state = MINED; break;
    }
    return _.merge(item, { state: state, disabled: true });
}

function handleMined(item: Item, action: string) {
    return _.merge(item, { state: MINED, disabled: true });
}

function handleState(item: Item, action: string) {
    switch (item.state) {
        case (HIDDEN): return handleHidden(item, action);
        case (VISIBLE): return handleVisible(item, action);
        case (FLAGGED): return handleFlagged(item, action);
        case (MINED): return handleMined(item, action);
    }
}
