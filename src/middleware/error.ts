import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/http.error.js';
import mongoose, { mongo } from 'mongoose';

import createDebug from 'debug';
const debug = createDebug('W6:ErrorMiddleware');

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  debug('Executed');

  if (error instanceof HttpError) {
    console.error(error.status, error.statusMessage, error.message);
    response.status(error.status);
    response.statusMessage = error.message;
    response.send({
      status: error.status + ' ' + error.statusMessage,
      error: error.message,
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    console.error('400 Bad request', error.message);
    response.status(400);
    response.statusMessage = 'Bad request';
    response.send({
      status: '400 Bad request',
      error: error.message,
    });
    return;
  }

  if (error instanceof mongo.MongoServerError) {
    console.error('406 Not accepted', error.message);
    response.status(406);
    response.statusMessage = 'Not accepted';
    response.send({
      status: '406 Not accepted',
      error: error.message,
    });
    return;
  }

  console.error(error);
  response.status(500);
  response.send({
    error: error.message,
  });
};
