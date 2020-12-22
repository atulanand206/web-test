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

function clickItem(container, className) {
    container.instance().forceUpdate();
    container.find(className).first().simulate('click');
    jest.advanceTimersByTime(1000);
}

function clickItemTimes(container, className, times) {
    for (let i = 0; i < times; i++)
        clickItem(container, className)
}

describe("Container background color", () => {
    let container;
    let start = 1;
    beforeEach(() => {
        jest.useFakeTimers();
        container = mount(<Container/>)
    });

    function expectBackgroundColorIndex(index) {
        const colors = container.instance().colors;
        expect(container.instance().state.styles.backgroundColor).toEqual(colors[index][0]);
    }

    function expectWebkitTextStrokeColorIndex(index) {
        const colors = container.instance().colors;
        expect(container.instance().state.textStyle.WebkitTextStrokeColor).toEqual(colors[index][1]);
    }

    it("has a list of 8 colors", () => {
        const colors = container.instance().colors;
        expect(colors.length).toEqual(8);
    });

    it("has background color as the first color in the list", () => {
        expectBackgroundColorIndex(start);
    });

    it("clicks div to change background color", () => {
        expectBackgroundColorIndex(start);
        clickItem(container, ".container");
        expectBackgroundColorIndex(start + 1);
        clickItem(container, ".container");
        expectBackgroundColorIndex(start + 2);
        clickItemTimes(container, ".container", 4);
        expectBackgroundColorIndex(start + 6);
    });

    it("has a text with complementary color", () => {
        const colors = container.instance().colors;
        clickItemTimes(container, ".container", 3);
        expectWebkitTextStrokeColorIndex(start + 3);
    });
});