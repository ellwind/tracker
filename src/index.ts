import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import to from 'await-to-js';

import TrackerService from './tracker.service';
import validate from './validate';
import config from './config';

import { BadRequestError } from './errors';

import './http-server';

dotenv.config();

const { PORT } = process.env;

const app: Express = express();

app.use(cors(config.cors));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: config.JSON_LIMIT }));

app.post('/tracker', async (req: Request, res: Response, next) => {
  const { events } = req.body;
  const validationErrors = validate(events);
  if (validationErrors.length) {
    return res
      .status(config.HTTP_ERRORS.BAD_REQUEST.STATUS)
      .send(BadRequestError('Validation error', validationErrors))
      .end();
  }
  const [error, result] = await to(TrackerService.updateTracker(events));
  if (error) {
    return res.status(500).send(error).end();
  }
  return res.status(200).send(result).end();
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
