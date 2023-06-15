import { Film } from '../entities/film';
import { FilmModel } from './film.mongo.model';
import { FilmRepo } from './films.mongo.repository';

jest.mock('./film.mongo.model.js');

describe('Given a FilmRepo class', () => {
  const repo = new FilmRepo();

  describe('When it is instantiated and query method is called', () => {
    test('Then FilmModel.find should have been called', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      FilmModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.query();
      expect(FilmModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When it is instantiatied and queryById method is called', () => {
    test('Then FilmModel.findById should have been called', async () => {
      const mockedFilm = { id: '1' } as Film;
      const mockedId = '1';
      const exec = jest.fn().mockResolvedValue([mockedFilm]);
      FilmModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.queryById(mockedId);
      expect(FilmModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([mockedFilm]);
    });
  });
});
