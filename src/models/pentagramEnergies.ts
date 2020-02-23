import {PentagramEnergy} from "./pentagramEnergy";
import {Meridian} from "./meridian";
import {EarthBranchAbbrs} from "./earthBranchAbbrs";

export class PentagramEnergies {
    public heat: PentagramEnergy;
    public humidity: PentagramEnergy;
    public dryness: PentagramEnergy;
    public cold: PentagramEnergy;
    public wind: PentagramEnergy;

    constructor(heat?: number, humidity?: number, dryness?: number, cold?: number, wind?: number);
    constructor(heat: number, humidity: number, dryness: number, cold: number, wind: number) {
        this.heat = heat ? new PentagramEnergy(heat) : new PentagramEnergy();
        this.humidity = humidity ? new PentagramEnergy(humidity) : new PentagramEnergy();
        this.dryness = dryness ? new PentagramEnergy(dryness) : new PentagramEnergy();
        this.cold = cold ? new PentagramEnergy(cold) : new PentagramEnergy();
        this.wind = wind ? new PentagramEnergy(wind) : new PentagramEnergy();
    }
}

declare module './pentagramEnergies' {
    interface PentagramEnergies {
        plus(other: PentagramEnergies): PentagramEnergies;
        getInnerMeridians(): Meridian[];
        getOuterMeridians(): Meridian[];
    }
}

PentagramEnergies.prototype.plus = function (other: PentagramEnergies) {
    return new PentagramEnergies(
        this.heat.value + other.heat.value,
        this.humidity.value + other.humidity.value,
        this.dryness.value + other.dryness.value,
        this.cold.value + other.cold.value,
        this.wind.value + other.wind.value
    );
};

PentagramEnergies.prototype.getInnerMeridians = function () {
    
    return [
        createMeridian.call(this, this.heat.color, EarthBranchAbbrs.MC),
        createMeridian.call(this, this.humidity.color, EarthBranchAbbrs.RP),
        createMeridian.call(this, this.dryness.color, EarthBranchAbbrs.P),
        createMeridian.call(this, this.cold.color, EarthBranchAbbrs.R),
        createMeridian.call(this, this.wind.color, EarthBranchAbbrs.F)
    ];
};

PentagramEnergies.prototype.getOuterMeridians = function () {
    return [
        createMeridian.call(this, this.heat.color, EarthBranchAbbrs.TR),
        createMeridian.call(this, this.humidity.color, EarthBranchAbbrs.E),
        createMeridian.call(this, this.dryness.color, EarthBranchAbbrs.GI),
        createMeridian.call(this, this.cold.color, EarthBranchAbbrs.V),
        createMeridian.call(this, this.wind.color, EarthBranchAbbrs.VB)
    ];
};

function createMeridian(color: string, abbr: EarthBranchAbbrs) {
    let t: Meridian = {color: color, abbr: abbr};
    return t;
}