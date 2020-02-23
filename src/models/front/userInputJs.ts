import {BaZiPillar} from "../baZiPillar";

export class UserInputJs {
    public birthDate: string;
    public birthHour: BaZiPillar;
    public eventDate: string;
    public receptionDate: string;
    public receptionHour: BaZiPillar;


    constructor(birthDate: string, birthHour: BaZiPillar, eventDate: string, receptionDate: string, receptionHour: BaZiPillar) {
        this.birthDate = birthDate;
        this.birthHour = birthHour;
        this.eventDate = eventDate;
        this.receptionDate = receptionDate;
        this.receptionHour = receptionHour;
    }
}