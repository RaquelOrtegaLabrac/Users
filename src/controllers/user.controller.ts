import { UserRepo } from '../repository/user.mongo.respository.js';

import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthServices } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6:UserController');

export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UserRepo) {
    debug('Instantiated');
  }

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const password = await AuthServices.hash(request.body.password);
      request.body.password = password;
      response.status(201);
      response.send(await this.repo.create(request.body));
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.body.user || !request.body.password) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (1)');
      }

      let data = await this.repo.search({
        key: 'userName',
        value: request.body.user,
      });

      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: request.body.user,
        });
      }

      if (!data.length) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (2)');
      }

      const isUserValid = await AuthServices.compare(
        request.body.password,
        data[0].password
      );
      if (!isUserValid) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (3)');
      }

      response.send(data[0]);
    } catch (error) {
      next(error);
    }
  }
}
