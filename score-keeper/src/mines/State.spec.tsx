import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import * as State from './State';
import Item from './State';

export const Transition = {
    HIDDEN: { FLAG: true, SHOW: true, MINE: true }, 
    VISIBLE: { FLAG: false, SHOW: false, MINE: false },
    FLAGGED: { FLAG: false, SHOW: true, MINE: true },
    MINED: { FLAG: false, SHOW: false, MINE: false }
};

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