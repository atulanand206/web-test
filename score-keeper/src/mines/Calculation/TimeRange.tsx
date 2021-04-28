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
    return ('0' + Math.round(number)).slice(-2);
}

export function timeDifferenceString(diff: number) {
    const diffInSeconds = format(diff / (1000));
    const diffInMinutes = format(diff / (1000 * 60));
    const diffInHours = format(diff / (1000 * 3600));
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