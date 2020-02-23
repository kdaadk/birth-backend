import {PentagramEnergies} from "./pentagramEnergies";

export class SetupPentagram {
    public innerEnergies: PentagramEnergies;
    public outerEnergies: PentagramEnergies;
    
    constructor(innerEnergies?: PentagramEnergies, outerEnergies?: PentagramEnergies)
    constructor(innerEnergies: PentagramEnergies, outerEnergies: PentagramEnergies) {
        this.innerEnergies = innerEnergies || new PentagramEnergies();
        this.outerEnergies = outerEnergies || new PentagramEnergies();
    }
}

declare module './setupPentagram' {
    interface SetupPentagram {
        plus(other: SetupPentagram): SetupPentagram;
    }
}

SetupPentagram.prototype.plus = function (other: SetupPentagram) {
    return new SetupPentagram(
        this.innerEnergies.plus(other.innerEnergies),
        this.outerEnergies.plus(other.outerEnergies)
    );
};