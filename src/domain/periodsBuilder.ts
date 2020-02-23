import {Period} from "../models/innerEnergyCycle/period";
let moment = require("moment");

export class PeriodsBuilder {
    public static build(startPeriod: Date, endPeriod: Date, monthCount: number) {
        let periods: Period[] = [];
        const isStartLeapDay = startPeriod.getDate() === 29 && startPeriod.getMonth() === 1;
        let start = startPeriod;
        for (let i = 0; i < 6; i++)
        {
            if (isStartLeapDay
                && periods.length !== 0
                && monthCount !== 144
                && start.getMonth() === 1
                && moment(start).daysInMonth() === 29
            )
                start = moment(start).add(1, 'days').toDate();
            
            const end = moment(start).add(monthCount, 'months').toDate();
            periods.push(new Period(i, this.getEnergyName(i), start, end));
            start = periods[periods.length - 1].end;
        }

        periods[periods.length - 1].end = endPeriod;
        return periods;
    }

    public static buildMonthPeriods(period: Period) {
        let periods: Period[] = [];
        let start = period.start;
        for (let i = 0; i < 6; i++)
        {
            let end = moment(start).add(20, 'days').toDate();
            if (start.getMonth() !== end.getMonth())
            {
                const newEnd = moment(start).add(1, 'months').subtract(10, 'days').toDate();
                if (end.getMonth() === newEnd.getMonth())
                    end = newEnd;
            }
            if (start.getMonth() === 2 && start.getDate() === 1)
                end = moment(start).add(18, 'days').toDate();
            if (end.getDate() === 31)
                end = moment(start).add(21, 'days').toDate();

            periods.push(new Period(i, this.getEnergyName(i), start, end));
            start = periods[periods.length - 1].end;
        }

        periods[periods.length - 1].end = period.end;
        return periods;
    }
    
    public static buildDayPeriods(period: Period) {
        const lengths = [3, 3, 4, 4, 3, 3];
        let periods: Period[] = [];
        let start = period.start;
        const daysInMonth = moment(start).daysInMonth();
        for (let i = 0; i < 6; i++)
        {
            let end = moment(start).add(lengths[i], 'days').toDate();

            if (daysInMonth === 31 && (end.getMonth() !== start.getMonth() || end.getDate() === 31))
                end = moment(start).add(lengths[i] + 1, 'days').toDate();
            if ((daysInMonth === 29 && end.getMonth() !== start.getMonth() && start.getDate() > 27) ||
                (daysInMonth === 28 && end.getMonth() !== start.getMonth() && end.getDate() >= 1))
                end = this.addDays(start, lengths[i] - 1);
            if (start.getMonth() === 2 && start.getDate() === 1)
            {
                if (periods.length === 0 || periods[periods.length - 1]?.start.getDate() === 26)
                    end = moment(start).add(lengths[i] - 2, 'days').toDate();
                if (periods[periods.length - 1]?.start.getDate() === 27)
                    end = moment(start).add(lengths[i] - 1, 'days').toDate();
            }

            periods.push(new Period(i, this.getEnergyName(i), start, end));
            start = periods[periods.length - 1].end;
        }

        periods[periods.length - 1].end = period.end;
        return periods;
    }

    private static addDays(start: Date, count: number) {
        return moment(start).add(count, 'days').toDate();
    }

    private static getEnergyName(index: number) {
        switch (index)
        {
        case 0:
            return "Ветер";
        case 1:
            return "Тепло";
        case 2:
            return "Жар";
        case 3:
            return "Влажность";
        case 4:
            return "Сухость";
        case 5:
            return "Холод";
        default:
            throw new Error("unknown index energy");
        }
    }
}