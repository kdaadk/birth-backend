export class PentagramEnergy {
    public value: number;
    public color: string;

    constructor(value?: number, color?: string);
    constructor(value: number, color: string) {
        this.value = value || 0;
        this.color = color || "";
    }
}