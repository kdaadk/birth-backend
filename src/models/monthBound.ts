export class MonthBound {
    loopLength: number;
    loopStartYear: number;
    sequences: number[][];

    constructor(loopLength: number, loopStartYear: number, sequences: number[][]) {
        this.loopLength = loopLength;
        this.loopStartYear = loopStartYear;
        this.sequences = sequences;
    }
}