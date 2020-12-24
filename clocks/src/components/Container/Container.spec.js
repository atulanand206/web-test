import React from 'react';
import {mount, shallow} from 'enzyme';
import Container from "../Container/Container"

describe('Container', () => {
    let container;
    beforeEach(() => (container = shallow(<Container/>)));

    it("should render a div", () => {
        expect(container.find('div').length).toEqual(1);
    });
});