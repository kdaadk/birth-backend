import {SkyStem} from "./skyStem";
import {EarthBranch} from "./earthBranch";

export class BaZiPillar {
    skyStem: SkyStem;
    earthBranch: EarthBranch;

    constructor(skyStem?: SkyStem, earthBranch?: EarthBranch);
    constructor(skyStem: SkyStem, earthBranch: EarthBranch) {
        this.skyStem = skyStem || 0;
        this.earthBranch = earthBranch || 0;
    }
}