export class EnergyList {
    public header: string;
    public list: string[];

    constructor(header: string, list: string[]) {
        this.header = header;
        this.list = list;
    }
}