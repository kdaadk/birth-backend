import {SkyStem} from "../models/skyStem";
import {EarthBranch} from "../models/earthBranch";
import {BaZiPillar} from "../models/baZiPillar";
import {Constants} from "../shared/constants";

export class ColorExtractor {
    static extract(pillar: BaZiPillar) {
        return {skyStemColor: this.extractSS(pillar.skyStem), earthBranchColor: this.extractEB(pillar.earthBranch)};    
    };
    
    private static extractSS(skyStem: SkyStem) {
        if (skyStem === SkyStem.YangFire || skyStem === SkyStem.YinFire)
            return Constants.Red;

        if (skyStem === SkyStem.YangMetal || skyStem === SkyStem.YinMetal)
            return Constants.Gray;

        if (skyStem === SkyStem.YangWater || skyStem === SkyStem.YinWater)
            return Constants.Blue;

        if (skyStem === SkyStem.YangWood || skyStem === SkyStem.YinWood)
            return Constants.LimeGreen;

        if (skyStem === SkyStem.YangEarth || skyStem === SkyStem.YinEarth)
            return Constants.Brown;
    };
    
    private static extractEB(earthBranch: EarthBranch) {
        if (earthBranch === EarthBranch.Dog || earthBranch === EarthBranch.Goat || earthBranch === EarthBranch.Dragon || earthBranch === EarthBranch.Ox)
            return Constants.Brown;

        if (earthBranch === EarthBranch.Horse || earthBranch === EarthBranch.Snake)
            return Constants.Red;

        if (earthBranch === EarthBranch.Tiger || earthBranch === EarthBranch.Rabbit)
            return Constants.LimeGreen;

        if (earthBranch === EarthBranch.Rat || earthBranch === EarthBranch.Pig)
            return Constants.Blue;
        
        if (earthBranch === EarthBranch.Monkey || earthBranch === EarthBranch.Rooster)
            return Constants.Gray;
    }
}