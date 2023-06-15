import { NextFunction, Request, Response } from 'express';
import { Repo } from '../repository/repo.js';
import { DataController } from './subject.controller.js';
import { Subject } from '../entities/subject.js';
describe('Given SubjectController class', () => {
  describe('When it is instantiated', () => {
    const mockRepo: Partial<Repo<Subject>> = {
      // eslint-disable-next-line object-shorthand
      query: async () => [] as Subject[],
      queryById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const req = {
      params: { id: 1 },
    } as unknown as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const controller = new DataController(mockRepo);

    test('Then method getAll should be used', async () => {
      await controller.getAll(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.query).toHaveBeenCalled();
    });
    test('Then method getById should be used', async () => {
      await controller.getById(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.queryById).toHaveBeenCalled();
    });
    test('Then method post should be used', async () => {
      await controller.post(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test('Then method patch should be used', async () => {
      await controller.patch(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.update).toHaveBeenCalled();
    });
    test('Then method delete should be used', async () => {
      await controller.deleteById(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});

describe('Given a Datacontroller', () => {
  const error = new Error('Test Error');
  const mockRepo = {
    query: jest.fn().mockRejectedValue(error),
    queryById: jest.fn().mockRejectedValue(error),
    search: jest.fn().mockRejectedValue(error),
    create: jest.fn().mockRejectedValue(error),
    update: jest.fn().mockRejectedValue(error),
    delete: jest.fn().mockRejectedValue(error),
  } as unknown as Repo<Subject>;

  const req = {
    params: { id: '1' },
    body: { id: '2', data: '' },
  } as unknown as Request;
  const res = { send: jest.fn() } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new DataController(mockRepo);
  describe('When it is instantiated and getAll method is called without valid input', () => {
    test('Then next(error) should have been called', async () => {
      await controller.getAll(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe('When it is instantiated and getById method is called without valid input', () => {
    test('Then next(error) should have been called', async () => {
      await controller.getById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe('When it is instantiated and post method is called without valid input', () => {
    test('Then next(error) should have been called', async () => {
      await controller.post(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe('When it is instantiated and patch method is called without valid input', () => {
    test('Then next(error) should have been called', async () => {
      await controller.patch(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe('When it is instantiated and delete method is called without valid input', () => {
    test('Then next(error) should have been called', async () => {
      await controller.deleteById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
