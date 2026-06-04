import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class TicketRepository {
  async create(data: Prisma.TicketUncheckedCreateInput) { return prisma.ticket.create({ data }); }
  async findAll() { return prisma.ticket.findMany(); }
  async findById(id: string) { return prisma.ticket.findUnique({ where: { id } }); }
  async update(id: string, data: Prisma.TicketUncheckedUpdateInput) { return prisma.ticket.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.ticket.delete({ where: { id } }); }
}
