export interface DateRange {
    start: Date,
    end?: Date
}

export function addStart(times: DateRange[]) {
    const d = times;
    d.push({ start: new Date() });
    return d;
}

export function addEnd(times: DateRange[]) {
    var d = times;
    var data = d[d.length - 1];
    data = { start: data.start, end: new Date() };
    d.pop();
    d.push(data);
    return d;
}

export function format(number: number) {
    return ('0' + Math.floor(number)).slice(-2);
}

export function timeDifferenceString(diff: number) {
    const diffString = diff.toString().split("")
    diffString[diffString.length - 1] = '0'
    diff = parseInt(diffString.join(""));
    const diffInSeconds = format((diff / 1000) % 60);
    const diffInMinutes = format((diff / 60000) % 60);
    const diffInHours = format((diff / 3600000));
    return diffInHours + ':' + diffInMinutes + ':' + diffInSeconds;
}

export function getTime(times: DateRange[]) {
    const diff = times.reduce((ac, time) => {
        if (time.end) ac += (time.end.getTime() - time.start.getTime());
        else ac += (new Date().getTime() - time.start.getTime());
        return ac;
    }, 0);
    return timeDifferenceString(diff);
}