import * as chai from 'chai';
import * as State from './State';
import { Item } from './State';
import {
    minedCells,
    calculateScore,
    emptyBooleanMatrix,
    isValidForVisitation,
    emptyNeighbourCells,
    emptyCells,
    revealCell,
    triggerFlag,
    minesHidden,
    minesLeft,
    showNumberCells
} from '../Calculation/Calc';

// const Transition = {
//     HIDDEN: { FLAG: true, SHOW: true, MINE: true }, 
//     VISIBLE: { FLAG: false, SHOW: false, MINE: false },
//     FLAGGED: { FLAG: false, SHOW: true, MINE: true },
//     MINED: { FLAG: false, SHOW: false, MINE: false }
// };

describe('State transition', function () {

    function testStateChange(input: Item, action: string, output: Item) {
        chai.expect(output).deep.equal(State.handleState(input, action));
    }

    it('should show and disable for a hidden item on show action', function () {
        testStateChange({ value: '10', state: State.HIDDEN, disabled: false },
            State.SHOW, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should flag for a hidden item on flag action', function () {
        testStateChange({ value: '10', state: State.HIDDEN, disabled: false },
            State.FLAG, { value: '10', state: State.FLAGGED, disabled: false });
    });

    it('should mine and disable for a hidden item on mine action', function () {
        testStateChange({ value: '10', state: State.HIDDEN, disabled: false },
            State.MINE, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a visible item on show action', function () {
        testStateChange({ value: '10', state: State.VISIBLE, disabled: true },
            State.SHOW, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should not change state for a visible item on flag action', function () {
        testStateChange({ value: '10', state: State.VISIBLE, disabled: true },
            State.FLAG, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should not change state for a visible item on mine action', function () {
        testStateChange({ value: '10', state: State.VISIBLE, disabled: true },
            State.MINE, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should show and disable for a flagged item on show action', function () {
        testStateChange({ value: '10', state: State.FLAGGED, disabled: false },
            State.SHOW, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should not change state for a flagged item on flag action', function () {
        testStateChange({ value: '10', state: State.FLAGGED, disabled: false },
            State.FLAG, { value: '10', state: State.FLAGGED, disabled: false });
    });

    it('should mine and disable for a flagged item on mine action', function () {
        testStateChange({ value: '10', state: State.FLAGGED, disabled: false },
            State.MINE, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a mined item on show action', function () {
        testStateChange({ value: '10', state: State.MINED, disabled: true },
            State.SHOW, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a mined item on flag action', function () {
        testStateChange({ value: '10', state: State.MINED, disabled: true },
            State.FLAG, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a mined item on mine action', function () {
        testStateChange({ value: '10', state: State.MINED, disabled: true },
            State.MINE, { value: '10', state: State.MINED, disabled: true });
    });
});

describe('Cell manipulation', function () {

    it('should create a boolean matrix of same size as cells', function () {
        const cells = [
            [
                { "disabled": false, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": "*", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "1", "state": "FLAGGED" }
            ]
        ];
        const expectation = [[false, false], [false, false]];
        chai.expect(expectation).deep.equal(emptyBooleanMatrix(cells));
    });

    it('should calculate the score of numbered visible cells', function () {
        const board = [
            [
                { "disabled": false, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": "*", "state": "VISIBLE" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "1", "state": "VISIBLE" }
            ]
        ];
        chai.expect(2).equal(calculateScore(board));
    });

    it('should check if the cell at coordinates is empty and hidden', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": true, "value": " ", "state": "VISIBLE" }
            ]
        ];
        const visited = [[true, false], [false, true]];
        chai.expect(true).equal(isValidForVisitation(board, visited, 0, 1))
        chai.expect(false).equal(isValidForVisitation(board, visited, 0, 0))
        chai.expect(false).equal(isValidForVisitation(board, visited, 1, 0))
        chai.expect(false).equal(isValidForVisitation(board, visited, 1, 1))
    });

    it('should give a list of empty neighbouring cells', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ]
        ];
        const expectation = [[0, 1], [1, 2], [1, 1], [0, 2]];
        chai.expect(expectation).deep.equal(emptyNeighbourCells(board, 0, 1));
    });

    it('should make empty cells visible when emptyCells is called', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ]
        ];
        const expectation = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": true, "value": " ", "state": "VISIBLE" },
                { "disabled": true, "value": " ", "state": "VISIBLE" }
            ],
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": true, "value": " ", "state": "VISIBLE" },
                { "disabled": true, "value": " ", "state": "VISIBLE" }
            ]
        ];
        chai.expect(expectation).deep.equal(emptyCells(board, 0, 1));
    });

    it('should make selected cell visible when revealCells is called if cell is not a mine', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ]
        ];
        const expectation = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ]
        ];
        chai.expect(expectation).deep.equal(revealCell(board, 1, 0));
    });

    it('should flag cell when triggerFlag is called', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ]
        ];
        const expectation = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": " ", "state": "FLAGGED" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" },
                { "disabled": false, "value": " ", "state": "HIDDEN" }
            ]
        ];
        chai.expect(expectation).deep.equal(triggerFlag(board, 0, 1));
    });

    it('should give count of mines hidden ', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": "*", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "FLAGGED" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "HIDDEN" }
            ]
        ];
        chai.expect(3).equal(minesHidden(board));
    });

    it('should give count of mines hidden minus flagged when mine is not hit', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "FLAGGED" },
                { "disabled": false, "value": "*", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "FLAGGED" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "HIDDEN" }
            ]
        ];
        chai.expect(2).equal(minesLeft(board, 4, false));
    });

    it('should give count of mines hidden minus flagged when mine is hit', function () {
        const board = [
            [
                { "disabled": true, "value": "1", "state": "FLAGGED" },
                { "disabled": false, "value": "*", "state": "MINED" },
                { "disabled": false, "value": "*", "state": "MINED" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "MINED" },
                { "disabled": false, "value": "*", "state": "MINED" }
            ]
        ];
        chai.expect(0).equal(minesLeft(board, 4, true));
    });

    it('should make mines visible when minedCells is called', function () {
        const cells = [
            [
                { "disabled": false, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": "*", "state": "HIDDEN" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "1", "state": "FLAGGED" }
            ]
        ];
        const expectation = [
            [
                { "disabled": false, "value": "1", "state": "VISIBLE" },
                { "disabled": true, "value": "*", "state": "MINED" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "1", "state": "FLAGGED" }
            ]
        ];
        chai.expect(expectation).deep.equal(minedCells(cells, 0, 1));
    });

    it('should make numbers visible when showNumberCells is called', function () {
        const cells = [
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "*", "state": "FLAGGED" }
            ],
            [
                { "disabled": false, "value": "1", "state": "HIDDEN" },
                { "disabled": false, "value": "1", "state": "HIDDEN" }
            ]
        ];
        const expectation = [
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": false, "value": "*", "state": "FLAGGED" }
            ],
            [
                { "disabled": true, "value": "1", "state": "VISIBLE" },
                { "disabled": true, "value": "1", "state": "VISIBLE" }
            ]
        ];
        chai.expect(expectation).deep.equal(showNumberCells(cells));
    });
});