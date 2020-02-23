export class Period {
    public number: number;
    public color: string;
    public energyName: string;
    public start: Date;
    public end: Date;
    
    constructor(number: number, energyName: string, start: Date, end: Date) {
        this.number = number;
        this.energyName = energyName;
        this.start = start;
        this.end = end;
        this.color = "";
    }
}