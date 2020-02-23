import {Meridian} from "./meridian";

export class OuterEnergyCircle {
    public meridians: Meridian[];

    constructor(meridians?: Meridian[])
    constructor(meridians: Meridian[]) {
        this.meridians = meridians || [new Meridian()];
    }
}