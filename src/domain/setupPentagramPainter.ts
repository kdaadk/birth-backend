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

        this.setColorsIfUnusual(pentagramInnerValues, pentagramOuterValues);
        this.setColorsIfUnusual(pentagramOuterValues, pentagramInnerValues);
    }

    private static readonly colorsOuterValuesIfEqualValues: string[] =
        [Constants.Red, Constants.Blue, Constants.Red, Constants.Blue, Constants.Blue];

    private static setColorsOn(inner: PentagramEnergy, outer: PentagramEnergy, outerColor: string) {
        outer.color = outerColor;
        inner.color = outerColor === Constants.Blue ? Constants.Red : Constants.Blue;
    }

    private static setColorsIfUnusual(innerEnergies: PentagramEnergy[], outerEnergies: PentagramEnergy[]) {
        if (innerEnergies.filter(x => x.color === Constants.Red).length !== 2)
            return;

        for (let i = 0; i < 5; i++)
        {
            const nextIndex = i >= 3 ? i - 3 : i + 2;
            if (innerEnergies[i].color === Constants.Red &&
                innerEnergies[nextIndex].color === Constants.Red)
            {
                const betweenIndex = i === 4 ? 0 : i + 1;
                innerEnergies[betweenIndex].color = Constants.Red;
                outerEnergies[betweenIndex].color = Constants.Blue;
            }
        }
    }
}