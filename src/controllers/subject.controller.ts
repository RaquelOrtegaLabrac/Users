import { Repo } from '../repository/repo.js';
import createDebug from 'debug';
import { Controller } from './generic.controller.js';
import { Subject } from '../entities/subject.js';
const debug = createDebug('W6:DataController');

export class DataController extends Controller<Subject> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repo<Subject>) {
    super();
    debug('Instantiated');
  }
}
