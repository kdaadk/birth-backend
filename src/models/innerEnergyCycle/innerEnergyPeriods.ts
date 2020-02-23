import {Period} from "./period";

export class InnerEnergyPeriods {
    public name: string;
    public periods: Period[];
    public eventPeriod: Period;
    
    constructor(name: string, periods: Period[], eventPeriod: Period) {
        this.name = name;
        this.periods = periods;
        this.eventPeriod = eventPeriod;
    }
}