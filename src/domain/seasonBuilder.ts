import {ChineseDateTransformer} from "./chineseDateTransformer";
import {EarthBranch} from "../models/earthBranch";
import {SkyStem} from "../models/skyStem";
import {BaZiPillar} from "../models/baZiPillar";

export class SeasonBuilder {
    
    public static build(bDate: Date) {
        const chineseBirthDate = ChineseDateTransformer.transform(bDate);
        let earthBranch = this.getEarthBranch(chineseBirthDate.getMonth());
        let skyStem = this.getSkyStem(bDate, chineseBirthDate.getFullYear());
        
        return new BaZiPillar(skyStem, earthBranch);
    }

    private static getSkyStem(bDate: Date, cYear: number) {
        if (this.isDateInclude(bDate, cYear, 2, 11, 4, 21))
            return SkyStem.YinWood;
        if (this.isDateInclude(bDate, cYear, 4, 22, 5, 8))
            return SkyStem.YinEarth;
        if (this.isDateInclude(bDate, cYear, 5, 9, 7, 20))
            return SkyStem.YinFire;
        if (this.isDateInclude(bDate, cYear, 7, 21, 8, 7))
            return SkyStem.YinEarth;
        if (this.isDateInclude(bDate, cYear, 8, 8, 10, 19))
            return SkyStem.YinMetal;
        if (this.isDateInclude(bDate, cYear, 10, 20, 11, 6))
            return SkyStem.YinEarth;
        if (this.isDateInclude(bDate, cYear, 1, 20, 2, 10))
            return SkyStem.YinEarth;
        return SkyStem.YinWater;
    }

    private static getEarthBranch(cMonth: number) {
        if (this.isMonthInclude(cMonth, 1, 2))
            return EarthBranch.Ox;
        if (this.isMonthInclude(cMonth, 3, 3))
            return EarthBranch.Snake;
        if (this.isMonthInclude(cMonth, 4, 5))
            return EarthBranch.Horse;
        if (this.isMonthInclude(cMonth, 6, 6))
            return EarthBranch.Snake;
        if (this.isMonthInclude(cMonth, 7, 8))
            return EarthBranch.Tiger;
        if (this.isMonthInclude(cMonth, 9, 9))
            return EarthBranch.Snake;
        if (this.isMonthInclude(cMonth, 10, 11))
            return EarthBranch.Rooster;
        return EarthBranch.Snake;
    }

    private static isDateInclude(bDate: Date,
                  chineseBirthYear: number,
                  beginBorderMonth: number,
                  beginBorderDay: number,
                  endBorderMonth: number,
                  endBorderDay: number) {
        return bDate >= new Date(chineseBirthYear, beginBorderMonth, beginBorderDay)
            && bDate <= new Date(chineseBirthYear, endBorderMonth, endBorderDay);
    }

    private static isMonthInclude(chineseBirthMonth: number, beginBorderMonth: number, endBorderMonth: number) {
        return chineseBirthMonth >= beginBorderMonth && chineseBirthMonth <= endBorderMonth;
    }
}