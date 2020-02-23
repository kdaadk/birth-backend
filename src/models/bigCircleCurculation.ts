import {Meridian} from "./meridian";

export class BigCircleCurculation {
    public meridians: Meridian[];

    constructor(meridians?: Meridian[])
    constructor(meridians: Meridian[]) {
        this.meridians = meridians || [new Meridian()];
    }
}