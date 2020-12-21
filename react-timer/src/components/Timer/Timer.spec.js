import React from "react"
import {mount, shallow} from "enzyme"
import Timer from "./Timer"

describe("Timer", () => {
    let container;

    beforeEach(() => (container = shallow(<Timer/>)));

    it("should render a <div />", () => {
        expect(container.find("div").length).toBeGreaterThanOrEqual(1);
    });

    it("should render instances of the TimerButton component", () => {
        expect(container.find("TimerButton").length).toEqual(3);
    });
});

function clickItem(container, className) {
    container.instance().forceUpdate();
    container.find(className).first().simulate('click');
}

function spyClick(spy, container, className) {
    expect(spy).toHaveBeenCalledTimes(0);
    clickItem(container, className);
    expect(spy).toHaveBeenCalledTimes(1);
}

function expectStateOn(container, state) {
    expect(container.instance().state.isOn).toEqual(state);
}

function getTime(minutes, seconds) {
    return minutes + " minutes : " + seconds + " seconds";
}

function expectTime(container, minutes, seconds) {
    expect(container.find('.time-display').first().text()).toEqual(
        getTime(minutes, seconds));
}

function pass1Second() {
    jest.useFakeTimers();
    jest.advanceTimersByTime(1000);
}

function pass10Seconds() {
    jest.useFakeTimers();
    jest.advanceTimersByTime(10000);
}

describe("Mounted Timer", () => {
    let container;

    beforeEach(() => (container = mount(<Timer/>)));

    it("invokes start timer when start button is clicked", () => {
        const spy = jest.spyOn(container.instance(), 'startTimer');
        spyClick(spy, container, '.start-timer');
    });

    it("invokes stop timer when stop button is clicked", () => {
        const spy = jest.spyOn(container.instance(), 'stopTimer');
        spyClick(spy, container, '.stop-timer');
    });

    it("invokes reset timer when reset button is clicked", () => {
        const spy = jest.spyOn(container.instance(), 'resetTimer');
        spyClick(spy, container, '.reset-timer');
    });

    it("should change isOn state true when the start button is clicked", () => {
        clickItem(container, '.start-timer');
        expectStateOn(container, true);
    });

    it("should change isOn state false when the stop button is clicked", () => {
        clickItem(container, '.stop-timer');
        expectStateOn(container, false);
    });

    it("should change isOn state false when the reset button is clicked after start", () => {
        clickItem(container, '.start-timer');
        expectStateOn(container, true);
        clickItem(container, '.reset-timer');
        expectStateOn(container, false);
    });

    it("should change isOn state false when the reset button is clicked after stop", () => {
        clickItem(container, '.stop-timer');
        expectStateOn(container, false);
        clickItem(container, '.reset-timer');
        expectStateOn(container, false);
    });
});

describe("Timer display and manipulation with defaults", () => {
    let container;
    let minutes = 50;
    let seconds = 0;

    beforeEach(() => {
        container = mount(<Timer/>);
        jest.useFakeTimers();
        defaults50();
    });

    function defaults50() {
        defaults(50, 0);
    }

    function defaults(mins, secs) {
        minutes = mins;
        seconds = secs;
        container.instance().setDefaults(mins, secs);
    }

    function reduceTime() {
        if (seconds === 0) {
            minutes = minutes - 1;
            seconds = 59;
        } else {
            seconds = seconds - 1;
        }
    }

    function expectDefaultTime(mins, secs) {
        expect(container.instance().defaultMinutes).toEqual(mins);
        expect(container.instance().defaultSeconds).toEqual(secs);
    }

    it("should display time in the view", () => {
        expectTime(container, container.instance().state.minutes, container.instance().state.seconds);
    });

    it("should start timer when start is clicked", () => {
        let total = minutes * 60 + seconds;
        expectTime(container, minutes, seconds);
        clickItem(container, '.start-timer');
        for (let i = 1; i <= total; i++) {
            pass1Second();
            reduceTime();
            expectTime(container, minutes, seconds);
        }
    });

    it("should stop timer 10 seconds after start is clicked", () => {
        expectTime(container, minutes, seconds);
        clickItem(container, '.start-timer');
        pass10Seconds();
        clickItem(container, '.stop-timer');
        expectTime(container, minutes - 1, seconds + 50);
        pass10Seconds();
        expectTime(container, minutes - 1, seconds + 50);
    });

    it("should reset timer back", () => {
        expectTime(container, minutes, seconds);
        clickItem(container, '.start-timer');
        pass10Seconds();
        expectTime(container, minutes - 1, seconds + 50);
        pass10Seconds();
        clickItem(container, '.reset-timer');
        expectTime(container, minutes, seconds);
    });

    it("should be able to set timer dynamically", () => {
        defaults(25, 0);
        expectDefaultTime(25, 0);
        defaults(50, 20);
        expectDefaultTime(50, 20);
        expectTime(container, 50, 20);
    });
});