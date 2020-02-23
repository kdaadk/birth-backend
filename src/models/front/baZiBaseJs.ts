export class BaZiBaseJs<T>
{
    public type: T;
    public chineseDisplay: string;
    public russianDisplay: string;
    public color?: string;
    public index: number;

    constructor(type: T, chineseDisplay: string, russianDisplay: string, index: number, color?: string, ) {
        this.type = type;
        this.chineseDisplay = chineseDisplay;
        this.russianDisplay = russianDisplay;
        this.index = index;
        this.color = color;
    }
}