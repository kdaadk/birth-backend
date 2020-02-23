import {Section} from "./section";
import {EnergyList} from "./energyList";

export class Description {
    public baseFeature: EnergyList;
    public mentalLevel: Section;
    public emotionalLevel: Section;

    constructor(baseFeature: EnergyList, mentalLevel: Section, emotionalLevel: Section) {
        this.baseFeature = baseFeature;
        this.mentalLevel = mentalLevel;
        this.emotionalLevel = emotionalLevel;
    }
}