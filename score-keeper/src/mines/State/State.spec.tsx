import * as chai from 'chai';
import * as State from './State';
import { Item } from './State';
import { minedCells, calculateScore, emptyBooleanMatrix, isValidForVisitation } from '../Calculation/Calc';

// const Transition = {
//     HIDDEN: { FLAG: true, SHOW: true, MINE: true }, 
//     VISIBLE: { FLAG: false, SHOW: false, MINE: false },
//     FLAGGED: { FLAG: false, SHOW: true, MINE: true },
//     MINED: { FLAG: false, SHOW: false, MINE: false }
// };

describe('State transition', function() {

    function testStateChange(input: Item, action: string, output: Item) {
        chai.expect(output).deep.equal(State.handleState(input, action));
    }

    it('should show and disable for a hidden item on show action', function() {
        testStateChange({ value: '10', state: State.HIDDEN, disabled: false }, 
        State.SHOW, { value: '10', state: State.VISIBLE, disabled: true });
    });
    
    it('should flag for a hidden item on flag action', function() {
        testStateChange({ value: '10', state: State.HIDDEN, disabled: false }, 
        State.FLAG, { value: '10', state: State.FLAGGED, disabled: false });
    });

    it('should mine and disable for a hidden item on mine action', function() {
        testStateChange({ value: '10', state: State.HIDDEN, disabled: false }, 
        State.MINE, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a visible item on show action', function() {
        testStateChange({ value: '10', state: State.VISIBLE, disabled: true }, 
        State.SHOW, { value: '10', state: State.VISIBLE, disabled: true });
    });
    
    it('should not change state for a visible item on flag action', function() {
        testStateChange({ value: '10', state: State.VISIBLE, disabled: true }, 
        State.FLAG, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should not change state for a visible item on mine action', function() {
        testStateChange({ value: '10', state: State.VISIBLE, disabled: true }, 
        State.MINE, { value: '10', state: State.VISIBLE, disabled: true });
    });

    it('should show and disable for a flagged item on show action', function() {
        testStateChange({ value: '10', state: State.FLAGGED, disabled: false }, 
        State.SHOW, { value: '10', state: State.VISIBLE, disabled: true });
    });
    
    it('should not change state for a flagged item on flag action', function() {
        testStateChange({ value: '10', state: State.FLAGGED, disabled: false }, 
        State.FLAG, { value: '10', state: State.FLAGGED, disabled: false });
    });

    it('should mine and disable for a flagged item on mine action', function() {
        testStateChange({ value: '10', state: State.FLAGGED, disabled: false }, 
        State.MINE, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a mined item on show action', function() {
        testStateChange({ value: '10', state: State.MINED, disabled: true }, 
        State.SHOW, { value: '10', state: State.MINED, disabled: true });
    });
    
    it('should not change state for a mined item on flag action', function() {
        testStateChange({ value: '10', state: State.MINED, disabled: true }, 
        State.FLAG, { value: '10', state: State.MINED, disabled: true });
    });

    it('should not change state for a mined item on mine action', function() {
        testStateChange({ value: '10', state: State.MINED, disabled: true }, 
        State.MINE, { value: '10', state: State.MINED, disabled: true });
    });
});

describe('Cell manipulation', function() {

    it('should create a boolean matrix of same size as cells', function() {
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

    it('should make mines visible when mined cells is called', function() {
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
        chai.expect(expectation).deep.equal(minedCells(cells, 0, 0));
    });

    it('should calculate the score of numbered visible cells', function() {
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

    it('should check if the cell at coordinates is empty and hidden', function() {
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
});