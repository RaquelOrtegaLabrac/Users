import { Router as createRouter } from 'express';
import { DataController } from '../controllers/subject.controller.js';
import { Subject } from '../entities/subject.js';
import { Repo } from '../repository/repo.js';
import { DataRepo } from '../repository/subject.repository.js';

import createDebug from 'debug';
const debug = createDebug('W6:SampleRouter');

debug('Executed');
const repo: Repo<Subject> = new DataRepo() as Repo<Subject>;
const controller = new DataController(repo);
export const dataRouter = createRouter();

dataRouter.get('/', controller.getAll.bind(controller));
dataRouter.get('/:id', controller.getById.bind(controller));
dataRouter.post('/', controller.post.bind(controller));
dataRouter.patch('/:id', controller.patch.bind(controller));
dataRouter.delete('/:id', controller.deleteById.bind(controller));
