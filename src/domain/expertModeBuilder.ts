import {UserInputJs} from "../models/front/userInputJs";
import {BaZiDateTimeJsBuilder} from "./baZiDateTimeJsBuilder";
import {SetupPentagramBuilder} from "./setupPentagramBuilder";
import {ExpertMode} from "../models/expertMode";
import {BigCircleCirculationBuilder} from "./bigCircleCirculationBuilder";
import {InnerEnergyCycleBuilder} from "./innerEnergyCycleBuilder";
import {OuterEnergyCircleBuilder} from "./outerEnergyCircleBuilder";
import {BigCircleCurculation} from "../models/bigCircleCurculation";
import {SetupModelBuilder} from "./setupModelBuilder";

export class ExpertModeBuilder {
    public static build(input: UserInputJs) {
        const birthDateTime = BaZiDateTimeJsBuilder.build(input.birthDate, input.birthHour);
        const eventDate = BaZiDateTimeJsBuilder.build(input.eventDate)?.date;
        const setupPentagram = birthDateTime && SetupPentagramBuilder.build(birthDateTime?.date);
        const meridians = setupPentagram && BigCircleCirculationBuilder.build(setupPentagram);
        const expertMode: ExpertMode = {
            birthDate: birthDateTime,
            eventDate: eventDate,
            receptionDate: BaZiDateTimeJsBuilder.build(input.receptionDate, input.receptionHour),
            setupPentagram: setupPentagram,
            innerEnergyCycle: InnerEnergyCycleBuilder.build(input.birthDate, input.eventDate),
            bigCircleCirculation: new BigCircleCurculation(meridians),
            outerEnergyCircle: OuterEnergyCircleBuilder.build(meridians, eventDate),
            setup: SetupModelBuilder.build(setupPentagram)
        };
        
        return expertMode;
    }
}

