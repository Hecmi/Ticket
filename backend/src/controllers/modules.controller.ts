import { Request, Response, NextFunction } from 'express';
import { modulesService } from '../services/modules.service';

export class ModulesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await modulesService.getAll();
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await modulesService.getById(req.params.id);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await modulesService.create(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await modulesService.update(req.params.id, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await modulesService.delete(req.params.id);
      res.status(204).send();
    } catch (error) { next(error); }
  }
}

export const modulesController = new ModulesController();
