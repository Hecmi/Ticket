import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class ModuleRepository {
  async create(data: Prisma.ModuleUncheckedCreateInput) { return prisma.module.create({ data }); }
  async findAll() { return prisma.module.findMany(); }
  async findById(id: string) { return prisma.module.findUnique({ where: { id } }); }
  async update(id: string, data: Prisma.ModuleUncheckedUpdateInput) { return prisma.module.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.module.delete({ where: { id } }); }
}
