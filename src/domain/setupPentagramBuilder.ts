import {BaZiDateJs} from "../models/front/baZiDateJs";
import {BaZiDate} from "../models/baZiDate";
import {BaZiPillar} from "../models/baZiPillar";
import {SetupPentagram} from "../models/setupPentagram";
import {PentagramEnergies} from "../models/pentagramEnergies";
import {SkyStem} from "../models/skyStem";
import {EarthBranch} from "../models/earthBranch";
import {SeasonBuilder} from "./seasonBuilder";
import {SetupPentagramPainter} from "./setupPentagramPainter";

export class SetupPentagramBuilder {
    public static build(model: BaZiDateJs) {
        if (!model)
            return undefined;
        
        let baZiDate: BaZiDate = {
            year: model.year.getBaZiPillar(),
            month: model.month.getBaZiPillar(),
            day: model.day.getBaZiPillar(),
            hour: model.hour && model.hour.getBaZiPillar(),
            season: !model.hour ? SeasonBuilder.build(model.birthDate) : undefined
        };
        
        return this.getSetupPentagram(baZiDate);
    }
    
    private static getSetupPentagram(date: BaZiDate) {
        const { year, month, day, hour, season } = date;
        debugger;
        const yearPentagram = this.getSetupPentagramPart(year);
        const monthPentagram = this.getSetupPentagramPart(month);
        const datePentagram = this.getSetupPentagramPart(day);
        const hourPentagram = this.getSetupPentagramPart(hour);
        const seasonPentagram = this.getSetupPentagramPart(season);

        let setupPentagram = yearPentagram
            .plus(monthPentagram)
            .plus(datePentagram)
            .plus(hourPentagram)
            .plus(seasonPentagram);

        SetupPentagramPainter.setColors(setupPentagram);
        return setupPentagram;
    }

    private static getSetupPentagramPart(baZiPillar?: BaZiPillar) {
        if (!baZiPillar)
            return new SetupPentagram();

        const {skyStemPentagram, earthBranchPentagram} = this.getValuesBy(baZiPillar);
        const {outerEnergies: outerEarthBranch, innerEnergies: innerEarthBranch} = earthBranchPentagram;
        const {outerEnergies: outerSkyStem, innerEnergies: innerSkyStem} = skyStemPentagram;
        return new SetupPentagram(innerSkyStem.plus(innerEarthBranch), outerSkyStem.plus(outerEarthBranch));
    }    

    private static getValuesBy(baZiPillar: BaZiPillar) {
        return {
            skyStemPentagram: this.getSetupPentagramBySkyStem(baZiPillar.skyStem),
            earthBranchPentagram: this.getSetupPentagramByEarthBranch(baZiPillar.earthBranch)
        };
    }

    private static getSetupPentagramBySkyStem(skyStem: SkyStem) {
        if (skyStem === 1)
            return this.getSetupPentagramByValues([4, 2, 1, 3, 5]);
        if (skyStem === 3)
            return this.getSetupPentagramByValues([5, 4, 2, 1, 3]);
        if (skyStem === 5)
            return this.getSetupPentagramByValues([3, 5, 4, 2, 1]);
        if (skyStem === 7)
            return this.getSetupPentagramByValues([1, 3, 5, 4, 2]);
        if (skyStem === 9)
            return this.getSetupPentagramByValues([2, 1, 3, 5, 4]);

        if (skyStem === 0)
            return this.getSetupPentagramByValues([4, 5, 3, 1, 2]);
        if (skyStem === 2)
            return this.getSetupPentagramByValues([2, 4, 5, 3, 1]);
        if (skyStem === 4)
            return this.getSetupPentagramByValues([1, 2, 4, 5, 3]);
        if (skyStem === 6)
            return this.getSetupPentagramByValues([3, 1, 2, 4, 5]);
        if (skyStem === 8)
            return this.getSetupPentagramByValues([5, 3, 1, 2, 4]);
        throw new Error();
    }

    private static getSetupPentagramByEarthBranch(earthBranch: EarthBranch) {
        if (earthBranch === 0)
            return this.getSetupPentagramByValues([5, 4, 2, 1, 3]);
        if (earthBranch === 1)
            return this.getSetupPentagramByValues([4, 2, 1, 3, 5]);
        if (earthBranch === 4)
            return this.getSetupPentagramByValues([1, 3, 5, 4, 2]);
        if (earthBranch === 5)
            return this.getSetupPentagramByValues([3, 5, 4, 2, 1]);
        if (earthBranch === 8)
            return this.getSetupPentagramByValues([5, 4, 2, 1, 3]);
        if (earthBranch === 9)
            return this.getSetupPentagramByValues([2, 1, 3, 5, 4]);

        if (earthBranch === 2)
            return this.getSetupPentagramByValues([2, 4, 5, 3, 1]);
        if (earthBranch === 3)
            return this.getSetupPentagramByValues([5, 3, 1, 2, 4]);
        if (earthBranch === 6)
            return this.getSetupPentagramByValues([3, 1, 2, 4, 5]);
        if (earthBranch === 7)
            return this.getSetupPentagramByValues([1, 2, 4, 5, 3]);
        if (earthBranch === 10)
            return this.getSetupPentagramByValues([4, 5, 3, 1, 2]);
        if (earthBranch === 11)
            return this.getSetupPentagramByValues([1, 2, 4, 5, 3]);
        throw new Error();
    }

    private static getSetupPentagramByValues(values: number[]) {
        const outer = new PentagramEnergies(values[0], values[1], values[2], values[3], values[4]);
        const inner = new PentagramEnergies(
            this.getRemainder(values[0]),
            this.getRemainder(values[1]),
            this.getRemainder(values[2]),
            this.getRemainder(values[3]),
            this.getRemainder(values[4])
        );
        return new SetupPentagram(inner, outer);
    }

    private static getRemainder(value: number) {
        const SumElements = 6;
        return SumElements - value;
    }
}