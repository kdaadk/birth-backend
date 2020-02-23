import {BaZiJs} from "../models/front/baZiJs";
import {EarthBranch, EarthBranchChineseDisplay, EarthBranchRussianDisplay} from "../models/earthBranch";
import {BaZiBaseJs} from "../models/front/baZiBaseJs";
import {ColorExtractor} from "./colorExtractor";
import {BaZiPillar} from "../models/baZiPillar";
import {SkyStem, SkyStemChineseDisplay, SkyStemRussianDisplay} from "../models/skyStem";

export class BaZiJsMapper {
    public static map(pillar: BaZiPillar)
    {
        const { skyStemColor, earthBranchColor } = ColorExtractor.extract(pillar);        
        const earthBranch: BaZiBaseJs<EarthBranch> = {
            color: earthBranchColor,
            chineseDisplay: EarthBranchChineseDisplay[pillar.earthBranch],
            russianDisplay: EarthBranchRussianDisplay[pillar.earthBranch],
            type: pillar.earthBranch,
            index: pillar.earthBranch
        };
        const skyStem: BaZiBaseJs<SkyStem> = {
            color: skyStemColor,
            chineseDisplay: SkyStemChineseDisplay[pillar.skyStem],
            russianDisplay: SkyStemRussianDisplay[pillar.skyStem],
            type: pillar.skyStem,
            index: pillar.skyStem
        };
        
        return new BaZiJs(skyStem, earthBranch);
    }
}