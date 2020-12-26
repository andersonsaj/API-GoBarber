import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/typeorm';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import '@shared/container';

import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
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
  },
);

app.listen(3333, () => {
  console.log('====Server started on port 3333!====');
});
