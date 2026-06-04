import { Request, Response, NextFunction } from 'express';
import { usersService } from '../services/users.service';

export class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.getAll();
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.getById(req.params.id);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.create(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.update(req.params.id, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.delete(req.params.id);
      res.status(204).send();
    } catch (error) { next(error); }
  }
}

export const usersController = new UsersController();
