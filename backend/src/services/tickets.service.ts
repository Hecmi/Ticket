import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';
import { TicketPriority, TicketStatus } from '@prisma/client';

export class TicketsService {
  async getAll() {
    return prisma.ticket.findMany({
      include: {
        creator: { select: { id: true, email: true, profile: true } },
        assignments: { include: { assignee: { select: { id: true, email: true } } } },
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        creator: { select: { id: true, email: true, profile: true } },
        assignments: { include: { assignee: { select: { id: true, email: true } } } },
        comments: { include: { user: { select: { id: true, email: true } } }, orderBy: { createdAt: 'asc' } }
      }
    });

    if (!ticket) throw new AppError('Ticket no encontrado', 404);
    return ticket;
  }

  async create(data: { title: string; description: string; priority?: TicketPriority; creatorId: string }) {
    return prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority || 'LOW',
        creatorId: data.creatorId,
        status: 'OPEN'
      }
    });
  }

  async updateStatus(id: string, status: TicketStatus) {
    await this.getById(id);
    return prisma.ticket.update({
      where: { id },
      data: { status }
    });
  }

  async updatePriority(id: string, priority: TicketPriority) {
    await this.getById(id);
    return prisma.ticket.update({
      where: { id },
      data: { priority }
    });
  }
}

export const ticketsService = new TicketsService();
