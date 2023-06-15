import fs from 'fs/promises';
import { Subject } from '../entities/subject.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';

import createDebug from 'debug';
const debug = createDebug('W6:DataRepo');

const file = './data.json';

const createID = (): Subject['id'] =>
  Math.trunc(Math.random() * 1_000_000).toString();

export class DataRepo implements Omit<Repo<Subject>, 'search'> {
  constructor() {
    debug('Data Repo');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Subject[];
    return aData;
  }

  async queryById(id: string) {
    const aData = await this.query();
    const result = aData.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async create(data: Omit<Subject, 'id'>) {
    const aData = await this.query();
    const newSubject: Subject = { ...data, id: createID() };
    const result = JSON.stringify([...aData, newSubject]);
    await fs.writeFile(file, result, { encoding: 'utf8' });
    return newSubject;
  }

  async update(id: string, data: Partial<Subject>) {
    const aData = await this.query();
    let newSubject: Subject = {} as Subject;
    const result = aData.map((item) => {
      if (item.id === id) {
        newSubject = { ...item, ...data };
        return newSubject;
      }

      return item;
    });
    if (!newSubject.id)
      throw new HttpError(404, 'Not found', 'Bad id for the update');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
    return newSubject;
  }

  async delete(id: string) {
    const aData = await this.query();
    const result = aData.filter((item) => item.id !== id);
    if (aData.length === result.length)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
  }
}
