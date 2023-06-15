import fs from 'fs/promises';
import { DataRepo } from './subject.repository.js';

jest.mock('fs/promises');

describe('Given DatatRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new DataRepo();

    test('Then method query should be used', async () => {
      (fs.readFile as jest.Mock).mockResolvedValueOnce('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then method queryById should be used', async () => {
      const mockSubject = [{ id: '1' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockSubject)
      );
      const result = await repo.queryById('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockSubject[0]);
    });
  });
});
