import {Description} from "./description";

export class Setup {
    public fullName: string;
    public shortName: string;
    public color: string;
    public description: Description;

    constructor(fullName: string, shortName: string, color: string, description: Description) {
        this.fullName = fullName;
        this.shortName = shortName;
        this.color = color;
        this.description = description;
    }
}