import {CursorEarthBranch} from "./cursorEarthBranch";
import {EarthBranchAbbrs} from "./earthBranchAbbrs";

export class Meridian {
    public abbr: EarthBranchAbbrs;
    public name?: string;
    public color: string;
    public isMaxWeak?: boolean;
    public cursor?: CursorEarthBranch;

    constructor(abbr?: EarthBranchAbbrs, name?: string, color?: string, isMaxWeak?: boolean, cursor?: CursorEarthBranch)
    constructor(abbr: EarthBranchAbbrs, name: string, color: string, isMaxWeak: boolean, cursor: CursorEarthBranch) {
        this.color = color;
        this.abbr = abbr;
        this.name = name || undefined;
        this.isMaxWeak = isMaxWeak || undefined;
        this.cursor = cursor || undefined;
    }    
}