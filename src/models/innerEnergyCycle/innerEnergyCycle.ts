import {InnerEnergyPeriods} from "./innerEnergyPeriods";

export class InnerEnergyCycle {
    public big: InnerEnergyPeriods;
    public year: InnerEnergyPeriods;
    public season: InnerEnergyPeriods;
    public month: InnerEnergyPeriods;
    public day: InnerEnergyPeriods;

    constructor(big: InnerEnergyPeriods, year: InnerEnergyPeriods, season: InnerEnergyPeriods, month: InnerEnergyPeriods, day: InnerEnergyPeriods) {
        this.big = big;
        this.year = year;
        this.season = season;
        this.month = month;
        this.day = day;
    }
}