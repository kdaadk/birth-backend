import {MonthBound} from "../models/monthBound";

export class BoundsProvider {
    public static getBoundDates(monthBound: MonthBound) {
        const { sequences, loopLength, loopStartYear } = monthBound;
        let boundDates: { [id: number]: number; } = {};
        let index = 0;
        for (let i = 0; i < sequences.length; i++) {
            let sequence = this.getLongSequence(i, sequences, loopLength);
            for (let j = 0; j < loopLength; j++) {
                boundDates[loopStartYear + index] = sequence[j];
                index++;
            }
        }
        return boundDates;
    }

    private static getLongSequence(sequencesIndex: number, sequences: number[][], loopLength: number) {
        const loopLengthSmall = loopLength / sequences[sequencesIndex].length + 1;
        const sequence = [];
        let index = 0;
        for (let i = 0; i < loopLengthSmall; i++) {
            for (let j = 0; j < sequences[sequencesIndex].length; j++) {
                if (index > loopLength - 1)
                    break;
                sequence[index] = sequences[sequencesIndex][j];
                index++;
            }
        }
        return sequence;
    }
}