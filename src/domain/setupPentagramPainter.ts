import {SetupPentagram} from "../models/setupPentagram";
import {Constants} from "../shared/constants";
import {PentagramEnergy} from "../models/pentagramEnergy";

export class SetupPentagramPainter {    
    public static setColors(pentagram: SetupPentagram) {
        const { innerEnergies: inner, outerEnergies: outer  } = pentagram;
        const pentagramInnerValues = [inner.heat, inner.humidity, inner.dryness, inner.cold, inner.wind];
        const pentagramOuterValues = [outer.heat, outer.humidity, outer.dryness, outer.cold, outer.wind];
        
        for (let i=0; i< 5; i++) {
            if (pentagramInnerValues[i].value > pentagramOuterValues[i].value)
                this.setColorsOn(pentagramInnerValues[i], pentagramOuterValues[i], Constants.Blue);
            else if (pentagramInnerValues[i].value < pentagramOuterValues[i].value)
                this.setColorsOn(pentagramInnerValues[i], pentagramOuterValues[i], Constants.Red);
            else
                this.setColorsOn(pentagramInnerValues[i], pentagramOuterValues[i], this.colorsOuterValuesIfEqualValues[i]);
        }

        //exclusions ToDo: refactor
        if (pentagramInnerValues.filter(x => x.color === Constants.Red).length === 2)
            this.setColorsIfExclusion(pentagramInnerValues, pentagramOuterValues);
        
        if (pentagramOuterValues.filter(x => x.color === Constants.Red).length === 2)
            this.setColorsIfExclusion(pentagramOuterValues, pentagramInnerValues);

        if (pentagramInnerValues.filter(x => x.color === Constants.Red).length === 1)
            this.setColorsIfOneRed(pentagramInnerValues, pentagramOuterValues);

        if (pentagramOuterValues.filter(x => x.color === Constants.Red).length === 1)
            this.setColorsIfOneRed(pentagramOuterValues, pentagramInnerValues);
    }

    private static readonly colorsOuterValuesIfEqualValues: string[] =
        [Constants.Red, Constants.Blue, Constants.Red, Constants.Blue, Constants.Blue];

    private static setColorsOn(inner: PentagramEnergy, outer: PentagramEnergy, outerColor: string) {
        outer.color = outerColor;
        inner.color = outerColor === Constants.Blue ? Constants.Red : Constants.Blue;
    }

    private static setColorsIfExclusion(side: PentagramEnergy[], oppositeSide: PentagramEnergy[]) {
        for (let i = 0; i < 5; i++)
        {
            const nextIndex = i >= 3 ? i - 3 : i + 2;
            if (side[i].color === Constants.Red && side[nextIndex].color === Constants.Red)
            {
                const betweenIndex = i === 4 ? 0 : i + 1;
                side[betweenIndex].color = Constants.Red;
                oppositeSide[betweenIndex].color = Constants.Blue;
            }
        }
    }
    private static setColorsIfOneRed(side: PentagramEnergy[], oppositeSide: PentagramEnergy[]) {
        for (let i = 0; i < 5; i++)
        {
            const nextIdx = i === 4 ? 0 : i + 1;
            const prevIdx = i === 0 ? 4 : i - 1;
            if (side[i].color === Constants.Red && side[nextIdx].value === 24 && side[prevIdx].value === 24)
            {
                side[nextIdx].color = Constants.Red;
                side[prevIdx].color = Constants.Red;
                oppositeSide[nextIdx].color = Constants.Blue;
                oppositeSide[prevIdx].color = Constants.Blue;
            }
        }
    }
}