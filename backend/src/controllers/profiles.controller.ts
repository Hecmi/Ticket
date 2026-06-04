import { Request, Response, NextFunction } from 'express';
import { profilesService } from '../services/profiles.service';

export class ProfilesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await profilesService.getAll();
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await profilesService.getAll();
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await profilesService.getById(req.params.id);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await profilesService.create(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await profilesService.update(req.params.id, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await profilesService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const profilesController = new ProfilesController();
