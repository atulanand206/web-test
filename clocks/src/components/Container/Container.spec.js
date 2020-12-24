import React from 'react';
import {mount, shallow} from 'enzyme';
import Container from "../Container/Container"
import Clock from "../clock/Clock";

describe('Container', () => {
    let container;
    beforeEach(() => (container = shallow(<Container/>)));

    it("should render a div", () => {
        expect(container.find('div').length).toEqual(1);
    });

    it("should render 3 clocks", () => {
        expect(container.find('Clock')).toHaveLength(3);
    });
});