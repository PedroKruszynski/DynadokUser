import 'reflect-metadata';

import express, { Request, Response } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import config from '@shared/environment';
import Database from '@shared/infra/mongodb';
import Redis from '@shared/infra/redis';
import Kafka from '@shared/infra/kafka';
import routes from './routes';
import '@shared/container';

Database.connect();
Redis.connect();
Kafka.connectProducer();

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response) => {
  console.error(err);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (request: Request, response: Response) => response.status(200).json({
  status: 'success',
  message: 'Server online',
}));

app.listen(config.app.port, () => {
  console.log(`Server started on port ${config.app.port}!`);
});
