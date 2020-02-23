import {BaZiJs} from "./baZiJs";
import '../../domain/test.extensions'

export class BaZiDateJs
{
    public day: BaZiJs;
    public month: BaZiJs;
    public year: BaZiJs;
    public hour: BaZiJs;
    public birthDate: Date;


    constructor(day: BaZiJs, month: BaZiJs, year: BaZiJs, hour: BaZiJs, birthDate: Date) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.birthDate = birthDate;
    }
}