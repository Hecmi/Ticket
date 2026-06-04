import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class OptionRepository {
  async create(data: Prisma.OptionUncheckedCreateInput) { return prisma.option.create({ data }); }
  async findAll() { return prisma.option.findMany(); }
  async findById(id: string) { return prisma.option.findUnique({ where: { id } }); }
  async update(id: string, data: Prisma.OptionUncheckedUpdateInput) { return prisma.option.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.option.delete({ where: { id } }); }
}
