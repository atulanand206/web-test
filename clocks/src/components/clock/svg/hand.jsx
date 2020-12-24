const Point = {
    X: 0,
    Y: 0
};

const secondsInHalfClock = 30;
const secondsInClock = 2 * secondsInHalfClock;
const minutesInHalfClock = 30;
const minutesInClock = 2 * minutesInHalfClock;
const hoursInHalfClock = 6;
const hoursInClock = 2 * hoursInHalfClock;
const lengthOfSecondHand = 90.0;
const lengthOfMinuteHand = 80.0;
const lengthOfHourHand = 50.0;
const centerX = 150;
const centerY = 150;

let SecondHand = function (tm) {
    return scalePoint(secondHandPoint(tm.getSeconds()), lengthOfSecondHand);
};

let MinuteHand = function (tm) {
    return scalePoint(minuteHandPoint(tm), lengthOfMinuteHand);
};

let HourHand = function (tm) {
    return scalePoint(hourHandPoint(tm), lengthOfHourHand);
};

let secondHandPoint = function (tm) {
    return anglePoint(secondsRadian(tm));
};

let minuteHandPoint = function (tm) {
    return anglePoint(minutesRadian(tm));
};

let hourHandPoint = function (tm) {
    return anglePoint(hoursRadian(tm));
};

let secondsRadian = function (tm) {
    return Math.PI / (secondsInHalfClock / (tm));
};

let minutesRadian = function (tm) {
    return Math.PI / (minutesInHalfClock / (tm.getMinutes())) + secondsRadian(tm.getSeconds()) / minutesInClock
};

let hoursRadian = function (tm) {
    return Math.PI / (hoursInHalfClock / (tm.getHours() % hoursInClock)) + minutesRadian(tm) / hoursInClock
};

let scalePoint = function (point, length) {
    point = {X: point.X * length, Y: point.Y * length};
    point = {X: point.X, Y: -point.Y};
    point = {X: point.X + centerX, Y: point.Y + centerY};
    return point;
};

let anglePoint = function (angle) {
    return {X: Math.sin(angle), Y: Math.cos(angle)}
};
