import Base from './../Base';
import Item, { handleState } from './../State/State';
import { emptyNeighbourCells } from './Calc';
import * as State from './../State/State';
import _ from 'lodash';
class Calculation {

    addStart(times) {
        const d = times;
        d.push({ start: new Date() });
        return d;
    }

    addEnd(times) {
        var d = times;
        var data = d[d.length - 1];
        data = { start: data.start, end: new Date() };
        d.pop();
        d.push(data);
        return d;
    }

    format(number) {
        return ('0' + Math.round(number)).slice(-2);
    }

    timeDifferenceString(diff) {
        const diffInSeconds = this.format(diff / (1000));
        const diffInMinutes = this.format(diff / (1000 * 60));
        const diffInHours = this.format(diff / (1000 * 3600));
        return diffInHours + ':' + diffInMinutes + ':' + diffInSeconds;
    }
    
    getTime(times) {
        const diff = times.reduce((ac, time) => {
            if (time.end) ac += (time.end.getTime() - time.start.getTime());
            else ac += (new Date() - time.start.getTime());
            return ac;
        }, 0);
        return this.timeDifferenceString(diff);
    }
}

export default Calculation;