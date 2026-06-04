import { Request, Response, NextFunction } from 'express';
import { assignmentsService } from '../services/assignments.service';

export class AssignmentsController {
  async assignTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const assignedById = req.user?.userId;
      if (!assignedById) throw new Error('Usuario no autenticado');

      const { assigneeId } = req.body;
      if (!assigneeId) throw new Error('Se requiere assigneeId');

      const result = await assignmentsService.assignTicket(req.params.ticketId, assigneeId, assignedById);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }

  async getAssignments(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await assignmentsService.getAssignments(req.params.ticketId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  }
}

export const assignmentsController = new AssignmentsController();
