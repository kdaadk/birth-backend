import {BaZiPillar} from "./baZiPillar";

export class BaZiDate {
    hour: BaZiPillar;
    day: BaZiPillar;
    month: BaZiPillar;
    season?: BaZiPillar;
    year: BaZiPillar;

    constructor(hour?: BaZiPillar, day?: BaZiPillar, month?: BaZiPillar, season?: BaZiPillar, year?: BaZiPillar);
    constructor(hour: BaZiPillar, day: BaZiPillar, month: BaZiPillar, season: BaZiPillar, year: BaZiPillar) {
        this.hour = hour || new BaZiPillar();
        this.day = day || new BaZiPillar();
        this.month = month || new BaZiPillar();
        this.season = season || new BaZiPillar();
        this.year = year || new BaZiPillar();
    }
}