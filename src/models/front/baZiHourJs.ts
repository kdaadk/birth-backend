import {BaZiJs} from "./baZiJs";

export class BaZiHourJs
{
    public display: string;
    public value: BaZiJs;
    
    constructor(display: string, value: BaZiJs) {
        this.display = display;
        this.value = value;
    }
}