import {InnerEnergyPeriods} from "../models/innerEnergyCycle/innerEnergyPeriods";
import {Period} from "../models/innerEnergyCycle/period";
import {Constants} from "../shared/constants";
import {PeriodsBuilder} from "./periodsBuilder";
import {InnerEnergyCycle} from "../models/innerEnergyCycle/innerEnergyCycle";
let moment = require("moment");

export class InnerEnergyCycleBuilder {
    public static build(rawBirthDate: string, rawEventDate: string) {
        if (!rawBirthDate || !rawEventDate)
            return undefined;

        let birthDate = moment(rawBirthDate, 'DD-MM-YYYY').toDate();
        let eventDate = moment(rawEventDate, 'DD-MM-YYYY').toDate();
        
        const isDiffMore72Y = moment(eventDate).diff(moment(birthDate)) > 2270592000000;
        const startDate = isDiffMore72Y ? moment(birthDate).add(72, 'years').toDate() : birthDate;

        const bigCyclePeriods = PeriodsBuilder.build(startDate, moment(startDate).add(72, 'years').toDate(), 144);
        const bigCycleEventPeriod = this.getEventPeriod(bigCyclePeriods, eventDate);
        const bigCycle = new InnerEnergyPeriods('БЦ', bigCyclePeriods, bigCycleEventPeriod);

        const yearCyclePeriods = PeriodsBuilder.build(bigCycle.eventPeriod.start, bigCycle.eventPeriod.end, 24);
        const yearCycleEventPeriod = this.getEventPeriod(yearCyclePeriods, eventDate);
        const yearCycle = new InnerEnergyPeriods('ГЦ', yearCyclePeriods, yearCycleEventPeriod);

        const seasonCyclePeriods = PeriodsBuilder.build(yearCycle.eventPeriod.start, yearCycle.eventPeriod.end, 4);
        const seasonCycleEventPeriod = this.getEventPeriod(seasonCyclePeriods, eventDate);
        const seasonCycle = new InnerEnergyPeriods('СЦ', seasonCyclePeriods, seasonCycleEventPeriod);

        const monthCyclePeriods = PeriodsBuilder.buildMonthPeriods(seasonCycle.eventPeriod);
        const monthCycleEventPeriod = this.getEventPeriod(monthCyclePeriods, eventDate);
        const monthCycle = new InnerEnergyPeriods('МЦ', monthCyclePeriods, monthCycleEventPeriod);

        const dayCyclePeriods = PeriodsBuilder.buildDayPeriods(monthCycle.eventPeriod);
        const dayCycleEventPeriod = this.getEventPeriod(dayCyclePeriods, eventDate);
        const dayCycle = new InnerEnergyPeriods('СуЦ', dayCyclePeriods, dayCycleEventPeriod);
        
        return new InnerEnergyCycle(bigCycle, yearCycle, seasonCycle, monthCycle, dayCycle);
    }

    private static readonly DefaultColors = [Constants.LimeGreen, Constants.Red, Constants.Orange, Constants.Gold, Constants.Gray, Constants.Blue];

    private static getEventPeriod(periods: Period[], eventDate: Date) {
        let eventPeriod = periods.filter(p => eventDate >= p.start && eventDate < p.end)[0];
        eventPeriod.color = this.DefaultColors[eventPeriod.number];
        return eventPeriod;
    }
}