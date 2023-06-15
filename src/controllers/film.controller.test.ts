import { NextFunction, Request, Response } from 'express';
import { FilmRepo } from '../repository/films.mongo.repository.js';
import { FilmController } from './film.controller.js';
describe('Given FilmController class', () => {
  const mockRepo = {
    query: jest.fn(),
    queryById: jest.fn(),
    create: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as FilmRepo;
  const req = {
    params: { id: '1' },
    body: { id: '2', data: '' },
  } as unknown as Request;
  const res = {
    send: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;
  const controller = new FilmController(mockRepo);
  describe('When it is instantiated', () => {
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

describe('Given a film controller', () => {
  const error = new Error('Test Error');
  const mockRepo = {
    query: jest.fn().mockRejectedValue(error),
    queryById: jest.fn().mockRejectedValue(error),
    create: jest.fn().mockRejectedValue(error),
    search: jest.fn().mockRejectedValue(error),
    update: jest.fn().mockRejectedValue(error),
    delete: jest.fn().mockRejectedValue(error),
  } as FilmRepo;

  const req = {
    params: { id: '1' },
    body: { id: '2', data: '' },
  } as unknown as Request;
  const res = { send: jest.fn() } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new FilmController(mockRepo);
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
