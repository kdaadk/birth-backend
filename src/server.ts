import App from './app';
import CalculatorController from './controllers/calculator.controller';

const app = new App(
    [
        new CalculatorController(),
    ],
    5000,
);

app.listen();