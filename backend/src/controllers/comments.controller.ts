import { Request, Response, NextFunction } from 'express';
import { commentsService } from '../services/comments.service';

export class CommentsController {
  async getByTicketId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await commentsService.getByTicketId(req.params.ticketId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error('Usuario no autenticado');

      const result = await commentsService.create(req.params.ticketId, userId, req.body.content);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }
}

export const commentsController = new CommentsController();
