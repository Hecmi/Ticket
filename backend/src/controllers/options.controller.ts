import { Request, Response, NextFunction } from 'express';
import { optionsService } from '../services/options.service';

export class OptionsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await optionsService.getAll();
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await optionsService.getById(req.params.id);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await optionsService.create(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await optionsService.update(req.params.id, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await optionsService.delete(req.params.id);
      res.status(204).send();
    } catch (error) { next(error); }
  }
}

export const optionsController = new OptionsController();
