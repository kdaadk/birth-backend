import {SkyStem} from "../skyStem";
import {BaZiBaseJs} from "./baZiBaseJs";
import {EarthBranch} from "../earthBranch";
import {BaZiPillar} from "../baZiPillar"; 

export class BaZiJs {
    public skyStem: BaZiBaseJs<SkyStem>;
    public earthBranch: BaZiBaseJs<EarthBranch>;
    
    constructor(skyStem: BaZiBaseJs<SkyStem>, earthBranch: BaZiBaseJs<EarthBranch>) {
        this.skyStem = skyStem;
        this.earthBranch = earthBranch;
    }
}

declare module './baZiJs' {
    interface BaZiJs {
        getBaZiPillar(): BaZiPillar;
    }
}

BaZiJs.prototype.getBaZiPillar = function () {
    return new BaZiPillar(this.skyStem.type, this.earthBranch.type);
};