import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export class CommentsService {
  async getByTicketId(ticketId: string) {
    // Verificar que el ticket existe
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new AppError('Ticket no encontrado', 404);

    return prisma.comment.findMany({
      where: { ticketId },
      include: {
        user: { select: { id: true, email: true, profile: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async create(ticketId: string, userId: string, content: string) {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new AppError('Ticket no encontrado', 404);

    return prisma.comment.create({
      data: {
        ticketId,
        userId,
        content
      },
      include: {
        user: { select: { id: true, email: true, profile: true } }
      }
    });
  }
}

export const commentsService = new CommentsService();
