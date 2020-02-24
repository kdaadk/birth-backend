import App from './app';
import CalculatorController from './controllers/calculator.controller';

const port = process.env.PORT || 5000;
const app = new App(
    [
        new CalculatorController()
    ], port,
);

app.listen();