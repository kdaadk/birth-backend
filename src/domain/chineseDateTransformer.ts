import {BoundsProvider} from "./boundsProvider";
import {MonthBound} from "../models/monthBound";

export class ChineseDateTransformer {
    public static transform(source: Date) {
        if (source.getMonth() === 0) {
            const sequences: number[][] = [[6], [5, 6, 6, 6], [6, 5, 5, 6], [5, 6, 5, 5]];
            return this.calculate(source, new MonthBound(35, 1914, sequences))
        }
        if (source.getMonth() === 1) {
            const sequences: number[][] = [[4, 4, 5, 5], [4, 5, 4, 4], [4], [4, 4, 3, 4]];
            return this.calculate(source, new MonthBound(34, 1913, sequences))
        }
        if (source.getMonth() === 2) {
            const sequences: number[][] = [[6], [6, 5, 6, 6], [6, 6, 5, 5], [5, 5, 6, 5]];
            return this.calculate(source, new MonthBound(35, 1912, sequences))
        }
        if (source.getMonth() === 3) {
            const sequences: number[][] = [[5, 5, 5, 6], [5], [4, 5, 5, 5], [4, 4, 5, 5]];
            return this.calculate(source, new MonthBound(32, 1912, sequences))
        }
        if (source.getMonth() === 4) {
            const sequences: number[][] = [[6], [6, 5, 6, 6], [5, 6, 6, 5], [6, 5, 5, 5]];
            return this.calculate(source, new MonthBound(30, 1913, sequences))
        }
        if (source.getMonth() === 5) {
            const sequences: number[][] = [[6, 6, 7, 6], [6], [6, 6, 6, 5], [6, 5, 5, 6]];
            return this.calculate(source, new MonthBound(30, 1905, sequences))
        }
        if (source.getMonth() === 6) {
            const sequences: number[][] = [[8, 7, 7, 8], [7, 7, 8, 7], [7], [7, 7, 7, 6]];
            return this.calculate(source, new MonthBound(30, 1927, sequences))
        }
        if (source.getMonth() === 7) {
            const sequences: number[][] = [[8], [8, 8, 8, 7], [8, 7, 7, 8], [7, 7, 8, 7]];
            return this.calculate(source, new MonthBound(30, 1915, sequences))
        }
        if (source.getMonth() === 8) {
            const sequences: number[][] = [[8], [8, 7, 8, 8], [7, 8, 8, 7], [8, 7, 7, 7]];
            return this.calculate(source, new MonthBound(30, 1929, sequences))
        }
        if (source.getMonth() === 9) {
            const sequences: number[][] = [[9, 9, 9, 8], [8, 9, 9, 8], [8, 8, 9, 8], [8]];
            return this.calculate(source, new MonthBound(32, 1913, sequences))
        }
        if (source.getMonth() === 10) {
            const sequences: number[][] = [[8, 8, 8, 7], [8, 8, 7, 7], [8, 7, 7, 7], [7]];
            return this.calculate(source, new MonthBound(33, 1925, sequences))
        }
        if (source.getMonth() === 11) {
            const sequences: number[][] = [[8, 7, 7, 8], [7, 7, 8, 7], [7], [7, 7, 7, 6]];
            return this.calculate(source, new MonthBound(34, 1919, sequences))
        }
        throw new Error();
    }

    private static calculate(source: Date, monthBound: MonthBound) {
        const bound = BoundsProvider.getBoundDates(monthBound)[source.getFullYear()];
        return source.getDate() < bound
            ? source.getMonth() === 1
                ? new Date(source.getFullYear() - 1, 12, source.getDate())
                : new Date(source.getFullYear(), source.getMonth() - 1, source.getDate())
            : source;
    }
}