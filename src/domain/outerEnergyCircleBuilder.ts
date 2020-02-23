import {BaZiDateJs} from "../models/front/baZiDateJs";
import {Meridian} from "../models/meridian";
import {CursorEarthBranch} from "../models/cursorEarthBranch";
import {Constants} from "../shared/constants";
import {OuterEnergyCircle} from "../models/outerEnergyCircle";

export class OuterEnergyCircleBuilder {
    public static build(meridians?: Meridian[], eventDate?: BaZiDateJs) {
    if (!meridians || !eventDate)
        return undefined;

    this.addCursors(meridians, eventDate);

    return new OuterEnergyCircle(meridians);
    }

    private static addCursors(meridians: Meridian[], eventDate: BaZiDateJs) {
        let arrowColors = this.getArrowColors(eventDate);
        const { Orange, LimeGreen, Gray, Gold, Blue, Red} = Constants;
        
        meridians[1].cursor = this.getCursorEarthBranch('Шао ян', Orange, arrowColors);
        meridians[3].cursor = this.getCursorEarthBranch('Цзюэ инь', LimeGreen, arrowColors);
        meridians[5].cursor = this.getCursorEarthBranch('Ян мин', Gray, arrowColors);
        meridians[7].cursor = this.getCursorEarthBranch('Тай инь', Gold, arrowColors);
        meridians[9].cursor = this.getCursorEarthBranch('Тай ян', Blue, arrowColors);
        meridians[11].cursor = this.getCursorEarthBranch('Шао инь', Red, arrowColors);
    }

    private static getCursorEarthBranch(energyName: string, color: string, arrowColors: string[]) {
        return new CursorEarthBranch(energyName, color, arrowColors.filter(c => c === color).length);
    }

    private static getArrowColors(eventDate: BaZiDateJs) {
        return [
            this.getArrowColor(eventDate.day.earthBranch.index),
            this.getArrowColor(eventDate.month.earthBranch.index),
            this.getArrowColor(eventDate.year.earthBranch.index)
        ]
    }

    private static getArrowColor(earthBranch: number) {
        const { Orange, LimeGreen, Gray, Gold, Blue, Red} = Constants;
        if ([3, 9].includes(earthBranch))
            return Orange;
        if ([6, 0].includes(earthBranch))
            return LimeGreen;
        if ([4, 10].includes(earthBranch))
            return Gray;
        if ([2, 8].includes(earthBranch))
            return Gold;
        if ([5, 11].includes(earthBranch))
            return Blue;
        if ([1, 7].includes(earthBranch))
            return Red;
        throw new Error('Unknown earth branch index');
    }
}