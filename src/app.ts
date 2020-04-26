import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import 'reflect-metadata';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

export default app;
