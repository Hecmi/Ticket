import { TicketRepository } from '../repositories/ticket.repository';
import { Prisma } from '@prisma/client';

export class TicketService {
  private repository = new TicketRepository();

  async create(data: Prisma.TicketUncheckedCreateInput) { return this.repository.create(data); }
  async getAll() { return this.repository.findAll(); }
  async getById(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Ticket not found');
    return record;
  }
  async update(id: string, data: Prisma.TicketUncheckedUpdateInput) { return this.repository.update(id, data); }
  async delete(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Ticket not found');
    return this.repository.delete(id);
  }
}
