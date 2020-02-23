import {SetupPentagram} from "./setupPentagram";
import {BaZiDateTimeJs} from "./front/baZiDateTimeJs";
import {BaZiDateJs} from "./front/baZiDateJs";
import {InnerEnergyCycle} from "./innerEnergyCycle/innerEnergyCycle";
import {Meridian} from "./meridian";
import {BigCircleCurculation} from "./bigCircleCurculation";
import {OuterEnergyCircle} from "./outerEnergyCircle";
import {Setup} from "./setup/setup";

export class ExpertMode {
    public setupPentagram?: SetupPentagram;
    public innerEnergyCycle?: InnerEnergyCycle;
    public birthDate?: BaZiDateTimeJs;
    public eventDate?: BaZiDateJs;
    public receptionDate?: BaZiDateTimeJs;
    public bigCircleCirculation?: BigCircleCurculation;
    public outerEnergyCircle?: OuterEnergyCircle;
    public setup?: Setup;


    constructor(setupPentagram?: SetupPentagram,
                innerEnergyCycle?: InnerEnergyCycle,
                birthDate?: BaZiDateTimeJs,
                eventDate?: BaZiDateJs,
                receptionDate?: BaZiDateTimeJs,
                bigCircleCirculation?: BigCircleCurculation,
                outerEnergyCircle?: OuterEnergyCircle,
                setup?: Setup)
    {
        this.setupPentagram = setupPentagram;
        this.innerEnergyCycle = innerEnergyCycle;
        this.birthDate = birthDate;
        this.eventDate = eventDate;
        this.receptionDate = receptionDate;
        this.bigCircleCirculation = bigCircleCirculation;
        this.outerEnergyCircle = outerEnergyCircle;
        this.setup = setup;
    }
}