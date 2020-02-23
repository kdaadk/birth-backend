import {BaZiHourJs} from "./baZiHourJs";
import {BaZiDateJs} from "./baZiDateJs";

export class BaZiDateTimeJs {
    public date: BaZiDateJs;
    public hours?: BaZiHourJs[];
    
    constructor(date: BaZiDateJs, hours?: BaZiHourJs[]) {
        this.date = date;
        this.hours = hours;
    }
}