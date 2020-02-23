import {BaZiPillar} from "../models/baZiPillar";
import {BaZiDateTimeJs} from "../models/front/baZiDateTimeJs";
import {BaZiDate} from "../models/baZiDate";
import {BaZiDateJs} from "../models/front/baZiDateJs";
import {BaZiJsMapper} from "./baZiJsMapper";
import {BaZiHoursJsBuilder} from "./baZiHoursJsBuilder";
import {BaZiDateBuilder} from "./baZiDateBuilder";
let moment = require("moment");

export class BaZiDateTimeJsBuilder {
    public static build(rawDate: string, hour: BaZiPillar = new BaZiPillar()) {
        if (!rawDate)
            return undefined;

        let date = moment(rawDate, 'DD-MM-YYYY').toDate();
        let birthDate = BaZiDateBuilder.build(date);        
        let dateJs = this.getBaZiDateJs(birthDate, date, hour);
        let hoursJs = BaZiHoursJsBuilder.build(birthDate);
        
        return new BaZiDateTimeJs(dateJs, hoursJs);
    }
    
    private static getBaZiDateJs(model: BaZiDate, birthDate: Date, hour: BaZiPillar = new BaZiPillar())
    {
        let baZiDateJs: BaZiDateJs = {
            day: BaZiJsMapper.map(model.day),
            month: BaZiJsMapper.map(model.month),
            year: BaZiJsMapper.map(model.year),
            birthDate: birthDate,
            hour: hour && BaZiJsMapper.map(hour)
        };
        return baZiDateJs;
    }
}