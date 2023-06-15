import { NextFunction, Request, Response } from 'express';
import { Repo } from '../repository/repo.js';

export abstract class Controller<T extends { id: string | number }> {
  protected repo!: Repo<T>;

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      response.send(await this.repo.query());
    } catch (error) {
      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      response.send(await this.repo.queryById(request.params.id));
    } catch (error) {
      next(error);
    }
  }

  async post(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(201);
      response.send(await this.repo.create(request.body));
    } catch (error) {
      next(error);
    }
  }

  async patch(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(202);
      response.send(await this.repo.update(request.params.id, request.body));
    } catch (error) {
      next(error);
    }
  }

  async deleteById(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(204);
      response.send(await this.repo.delete(request.params.id));
    } catch (error) {
      next(error);
    }
  }
}
