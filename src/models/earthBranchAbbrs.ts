export enum EarthBranchAbbrs {
    Default,
    MC,
    TR,
    VB,
    F,
    P,
    GI,
    E,
    RP,
    C,
    IG,
    V,
    R
}

export let EarthBranchAbbrsDisplay: { [index: number]: string } = {};
EarthBranchAbbrsDisplay[EarthBranchAbbrs.MC] = "MC";
EarthBranchAbbrsDisplay[EarthBranchAbbrs.TR] = "TR";
EarthBranchAbbrsDisplay[EarthBranchAbbrs.C] = "C";
EarthBranchAbbrsDisplay[EarthBranchAbbrs.IG] = "IG";