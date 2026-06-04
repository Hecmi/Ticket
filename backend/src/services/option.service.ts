import { OptionRepository } from '../repositories/option.repository';
import { Prisma } from '@prisma/client';

export class OptionService {
  private repository = new OptionRepository();

  async create(data: Prisma.OptionUncheckedCreateInput) { return this.repository.create(data); }
  async getAll() { return this.repository.findAll(); }
  async getById(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Option not found');
    return record;
  }
  async update(id: string, data: Prisma.OptionUncheckedUpdateInput) { return this.repository.update(id, data); }
  async delete(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Option not found');
    return this.repository.delete(id);
  }
}
