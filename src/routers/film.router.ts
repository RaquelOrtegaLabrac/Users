import { Router as createRouter } from 'express';
import { FilmController } from '../controllers/film.controller.js';
import { FilmRepo } from '../repository/films.mongo.repository.js';
import { Repo } from '../repository/repo.js';
import { Film } from '../entities/film.js';

import createDebug from 'debug';
const debug = createDebug('W6:FilmRouter');

debug('Executed');

const repo: Repo<Film> = new FilmRepo();
const controller = new FilmController(repo);
export const filmRouter = createRouter();

filmRouter.get('/', controller.getAll.bind(controller));
filmRouter.get('/:id', controller.getById.bind(controller));
filmRouter.post('/', controller.post.bind(controller));
filmRouter.patch('/:id', controller.patch.bind(controller));
filmRouter.delete('/:id', controller.deleteById.bind(controller));
