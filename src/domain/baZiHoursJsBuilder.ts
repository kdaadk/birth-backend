import {BaZiHourJs} from "../models/front/baZiHourJs";
import {BaZiJsMapper} from "./baZiJsMapper";
import {BaZiPillar} from "../models/baZiPillar";
import {BaZiDate} from "../models/baZiDate";
import {SkyStem} from "../models/skyStem";

export class BaZiHoursJsBuilder {
    public static build(baZiDate: BaZiDate) {
        if (!baZiDate.day)
            return undefined;

        const {skyStem} = baZiDate.day;

        if (skyStem === SkyStem.YangWood || skyStem === SkyStem.YinEarth)
            return this.getHours(1, 1);
        if (skyStem === SkyStem.YinWood || skyStem === SkyStem.YangMetal)
            return this.getHours(3, 1);
        if (skyStem === SkyStem.YangFire || skyStem === SkyStem.YinMetal)
            return this.getHours(5, 1);
        if (skyStem === SkyStem.YinFire || skyStem === SkyStem.YangWater)
            return this.getHours(7, 1);
        if (skyStem === SkyStem.YangEarth || skyStem === SkyStem.YinWater)
            return this.getHours(9, 1);

        throw new Error();
    }

    private static getHours(skyStem: number, earthBranch: number) {
        let hours: BaZiHourJs[] = [];

        for (let i = 0; i < 13; i++) {
            const value = BaZiJsMapper.map(new BaZiPillar(skyStem, earthBranch));
            const {chineseDisplay, russianDisplay} = value.earthBranch;
            const display = `${chineseDisplay} ${russianDisplay}`;
            hours.push(new BaZiHourJs(display, value));
            skyStem++;
            skyStem %= 10;
            earthBranch++;
            earthBranch %= 12;
        }

        return hours;
    }
}