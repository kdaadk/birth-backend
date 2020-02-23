import {SkyStem} from "../models/skyStem";
import {EarthBranch} from "../models/earthBranch";
import {ChineseDateTransformer} from "./chineseDateTransformer";
import {BaZiPillar} from "../models/baZiPillar";
import {BaZiDate} from "../models/baZiDate";

export class BaZiDateBuilder {
    public static build(bDate: Date) {
        const {skyStem: skyStemDay, earthBranch: earthBranchDay} = this.calculateDate(bDate);
        const {skyStem: skyStemMonth, earthBranch: earthBranchMonth} = this.calculateMonth(bDate);
        const {skyStem: skyStemYear, earthBranch: earthBranchYear} = this.calculateYear(bDate);
        const baZiDate: BaZiDate = {
            day: new BaZiPillar(skyStemDay, earthBranchDay),
            month: new BaZiPillar(skyStemMonth, earthBranchMonth),
            year: new BaZiPillar(skyStemYear, earthBranchYear),
            hour: new BaZiPillar(),
            season: new BaZiPillar()
        };
        return baZiDate;
    }
    
    private static calculateDate(bDate: Date) {
        const minDate = new Date(1900, 3, 20);
        const diff = Math.ceil((bDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        return this.getResult(diff);
    }

    private static calculateMonth(bDate: Date) {
        const minDate = new Date(1903, 10, 17);
        const chineseBirthDate = ChineseDateTransformer.transform(bDate) || bDate; // ToDo: crutch because possible undefined
        const diff = (chineseBirthDate.getFullYear() - minDate.getFullYear()) * 12 + chineseBirthDate.getMonth() - minDate.getMonth();
        return this.getResult(diff);
    }

    private static calculateYear(bDate: Date) {
        const minYear = 1863;
        let beforeBorder = 0;
        if (bDate.getMonth() === 0 || (bDate.getDate() < 4 && bDate.getMonth() === 1))
            beforeBorder = -1;
        
        const diff = bDate.getFullYear() - minYear + beforeBorder;
        return this.getResult(diff);
    }

    private static getResult(diff: number) {
        const loopLength = diff % 60;
        const skyStem: SkyStem = loopLength % 10;
        const earthBranch: EarthBranch = loopLength % 12;
        return {skyStem: skyStem, earthBranch: earthBranch};
    }      
}