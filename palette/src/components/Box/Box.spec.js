import React from 'react';
import {mount, shallow} from 'enzyme';
import Box from "../Box/Box"

describe('Box', () => {
    let container;
    beforeEach(() => (container = shallow(<Box/>)));

    it("should render a div", () => {
        expect(container.find('div').length).toEqual(1);
    });
});

describe('HDR Image in Box', () => {
    let container;
    beforeEach(() => (container = mount(<Box/>)));

    it("should have an image tag", () => {
        expect(container.find('img').length).toEqual(1);
    });

    it("should have the image src in state", () => {
        expect(container.instance().state.imgSrc).toBeTruthy()
    });

    it("should have the image src's attribute from the state", () => {
        expect(container.find('img').props.src).toEqual(container.instance().state.imgSrc)
    });
});