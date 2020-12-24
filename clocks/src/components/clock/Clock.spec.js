import React from 'react';
import {mount, shallow} from 'enzyme';
import Clock from "./Clock";

describe('Clock', () => {
    let container;
    beforeEach(() => (container = shallow(<Clock/>)));

    it("should render a div", () => {
        expect(container.find('.clock').length).toEqual(1);
    });

    it("should has a circle style", () => {
        expect(container.instance().state.circleStyle).toBeTruthy();
    });

    it("should render a div for clock face", () => {
        expect(container.find('.clock-face').length).toEqual(1);
    });

    it("has a second hand based on the state time", () => {
        expect(container.find('.second-hand').length).toEqual(1);
    });
});

describe("Clock Face Style", () => {
    let container;
    beforeEach(() => {
        container = mount(<Clock/>);
    });

    function clockFaceStyle() {
        return container.find('.clock-face').first().prop('style');
    }

    it("should check if the clock face has circle style", () => {
        expect(clockFaceStyle()).toBeTruthy();
    });

    it("has a black stroke of 25px", () => {
        expect(clockFaceStyle()).toHaveProperty('border', 'dashed #FFF');
    });

    it("has a red background", () => {
        expect(clockFaceStyle()).toHaveProperty('backgroundColor', '#ad0f20');
    });
});

describe("Clock Time", () => {
    let container;
    beforeEach(() => {
        container = mount(<Clock/>);
    });

    it("has a time value in state", () => {
        expect(container.instance().state.time).toBeTruthy();
    });
});

describe("Clock Hands Style", () => {
    let container;
    beforeEach(() => {
        container = mount(<Clock/>);
    });

    function secondHandStyle() {
        return container.find('.second-hand').first().prop('style');
    }

    it("has a style prop", () => {
        expect(secondHandStyle()).toBeTruthy();
    });

    it("has a style prop", () => {
        expect(secondHandStyle()).toHaveProperty('stroke', '4px');
    });
});

describe("Clock Canvas", () => {
    let container;
    // beforeEach(() => {
    //     container = mount(<Clock/>);
    // });

    it("has a canvas to draw the time components", () => {
        // expect(container.find('canvas').length).toEqual(1);
    });
});