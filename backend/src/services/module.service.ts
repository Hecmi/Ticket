import { ModuleRepository } from '../repositories/module.repository';
import { Prisma } from '@prisma/client';

export class ModuleService {
  private repository = new ModuleRepository();

  async create(data: Prisma.ModuleUncheckedCreateInput) { return this.repository.create(data); }
  async getAll() { return this.repository.findAll(); }
  async getById(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Module not found');
    return record;
  }
  async update(id: string, data: Prisma.ModuleUncheckedUpdateInput) { return this.repository.update(id, data); }
  async delete(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Module not found');
    return this.repository.delete(id);
  }
}
