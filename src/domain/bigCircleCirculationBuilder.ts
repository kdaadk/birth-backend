import {SetupPentagram} from "../models/setupPentagram";
import {Meridian} from "../models/meridian";
import {EarthBranchAbbrs, EarthBranchAbbrsDisplay} from "../models/earthBranchAbbrs";
import {Constants} from "../shared/constants";


export class BigCircleCirculationBuilder {
    public static build(pentagram: SetupPentagram) {
        if (!pentagram)
            return undefined;

        let innerMeridians = pentagram.innerEnergies.getInnerMeridians();
        let outerMeridians = pentagram.outerEnergies.getOuterMeridians();
        this.setWeakValues(innerMeridians, true);
        this.setWeakValues(outerMeridians, false);
        let meridians = this.mergeValues(innerMeridians, outerMeridians);
        this.setNames(meridians);

        return meridians;
    }

    private static mergeValues(innerMeridians: Meridian[], outerMeridians: Meridian[]) {
        const mc = innerMeridians.filter(m => m.abbr === EarthBranchAbbrs.MC)[0];
        const tr = outerMeridians.filter(m => m.abbr === EarthBranchAbbrs.TR)[0];
        return [
            mc, tr,
            outerMeridians.filter(m => m.abbr === EarthBranchAbbrs.VB)[0], innerMeridians.filter(m => m.abbr === EarthBranchAbbrs.F)[0],
            innerMeridians.filter(m => m.abbr === EarthBranchAbbrs.P)[0], outerMeridians.filter(m => m.abbr === EarthBranchAbbrs.GI)[0],
            outerMeridians.filter(m => m.abbr === EarthBranchAbbrs.E)[0], innerMeridians.filter(m => m.abbr === EarthBranchAbbrs.RP)[0],
            Object.assign({}, mc), Object.assign({}, tr),
            outerMeridians.filter(m => m.abbr === EarthBranchAbbrs.V)[0], innerMeridians.filter(m => m.abbr === EarthBranchAbbrs.R)[0],
        ];
    }

    private static setNames(meridians: Meridian[]) {
        for (let i = 0; i < meridians.length; i++) {
            if (meridians[i].name === undefined)
                meridians[i].name = EarthBranchAbbrs[i + 1];
            else {
                if (meridians[i].name !== EarthBranchAbbrs[i + 1]) {
                    meridians[i].name = EarthBranchAbbrs[i + 1];
                    meridians[i].isMaxWeak = false;
                }
            }
        }
    }

    private static setWeakValues(meridians: Meridian[], isInner: boolean) {
        for (let i = 0; i < meridians.length; i++) {
            const nextIndex = this.loopIndex(i + 1, meridians.length);
            if (meridians[i].color === Constants.Blue && meridians[nextIndex].color === Constants.Red)
                meridians[i].isMaxWeak = true;

            if (i === 0 && meridians[i].color === Constants.Blue) {
                if (this.isThreeRed(nextIndex, meridians)) {
                    meridians[i].isMaxWeak = true;
                    meridians[i].name = isInner ? EarthBranchAbbrsDisplay[EarthBranchAbbrs.MC] : EarthBranchAbbrsDisplay[EarthBranchAbbrs.TR];
                }
                if (this.isTwoRed(nextIndex, meridians)) {
                    meridians[i].isMaxWeak = true;
                    meridians[i].name = isInner ? EarthBranchAbbrsDisplay[EarthBranchAbbrs.C] : EarthBranchAbbrsDisplay[EarthBranchAbbrs.IG];
                }
            }
        }
    }

    private static loopIndex(i: number, length: number) {
        return i % length;
    }
    
    private static isThreeRed(i: number, meridians: Meridian[]) {
        return meridians[this.loopIndex(i, meridians.length)].color === Constants.Red
        && meridians[this.loopIndex(i + 1, meridians.length)].color === Constants.Red
        && meridians[this.loopIndex(i + 2, meridians.length)].color === Constants.Red;
    }

    private static isTwoRed(i: number, meridians: Meridian[]) {
        return meridians[this.loopIndex(i, meridians.length)].color === Constants.Red
            && meridians[this.loopIndex(i + 1, meridians.length)].color === Constants.Red
            && meridians[this.loopIndex(i + 2, meridians.length)].color === Constants.Blue;
    }
}