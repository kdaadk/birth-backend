import {EnergyList} from "./energyList";

export class Section {
    public header: string;
    public text: string;
    public excess: EnergyList;
    public lack: EnergyList;

    constructor(header: string, text: string, excess: EnergyList, lack: EnergyList) {
        this.header = header;
        this.text = text;
        this.excess = excess;
        this.lack = lack;
    }
}