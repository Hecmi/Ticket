import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export class AssignmentsService {
  async assignTicket(ticketId: string, assigneeId: string, assignedById: string) {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new AppError('Ticket no encontrado', 404);

    const user = await prisma.user.findUnique({ where: { id: assigneeId } });
    if (!user) throw new AppError('Usuario a asignar no encontrado', 404);

    // Evitar asignar dos veces a la misma persona si ya está asignado
    const existing = await prisma.assignment.findFirst({
      where: { ticketId, assigneeId }
    });
    if (existing) throw new AppError('El ticket ya está asignado a este usuario', 400);

    return prisma.assignment.create({
      data: {
        ticketId,
        assigneeId,
        assignedById
      },
      include: {
        assignee: { select: { id: true, email: true, profile: true } }
      }
    });
  }

  async getAssignments(ticketId: string) {
    return prisma.assignment.findMany({
      where: { ticketId },
      include: {
        assignee: { select: { id: true, email: true, profile: true } }
      }
    });
  }
}

export const assignmentsService = new AssignmentsService();
