import * as express from 'express';
import {ExpertModeBuilder} from "../domain/expertModeBuilder";
import {UserInputJs} from "../models/front/userInputJs";
import {BaZiDateTimeJsBuilder} from "../domain/baZiDateTimeJsBuilder";

class CalculatorController {
    public path = '/calculator';
    public router = express.Router();
    
    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.getExpertMode);
        this.router.post(`${this.path}/hours`, this.getHours);
    }

    getExpertMode = (request: express.Request, response: express.Response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        const input: UserInputJs = request.body;
        response.send(ExpertModeBuilder.build(input));
    };
    
    getHours = (request: express.Request, response: express.Response) => {
        const birthDate: string = request.body;
        response.send(BaZiDateTimeJsBuilder.build(birthDate));
    }
}

export default CalculatorController;