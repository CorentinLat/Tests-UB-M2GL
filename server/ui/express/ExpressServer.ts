import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import { Application } from '../../application/Application';
import { Infra } from '../../infra/Infra';
import { MainRouter } from './router/MainRouter';

const infra = new Infra();
const application = new Application(infra);
const mainRouter = new MainRouter(application);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', mainRouter.router);

app.listen(3000, () => console.log('Server is running on port 3000'));
