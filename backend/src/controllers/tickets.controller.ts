import { Request, Response, NextFunction } from 'express';
import { ticketsService } from '../services/tickets.service';

export class TicketsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ticketsService.getAll();
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ticketsService.getById(req.params.id);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Usar el userId inyectado por el middleware de auth
      const creatorId = req.user?.userId;
      if (!creatorId) throw new Error('Usuario no autenticado');

      const result = await ticketsService.create({ ...req.body, creatorId });
      res.status(201).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ticketsService.updateStatus(req.params.id, req.body.status);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async updatePriority(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ticketsService.updatePriority(req.params.id, req.body.priority);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }
}

export const ticketsController = new TicketsController();
