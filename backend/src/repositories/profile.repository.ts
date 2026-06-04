import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class ProfileRepository {
  async create(data: Prisma.ProfileUncheckedCreateInput) { return prisma.profile.create({ data }); }
  async findAll() { return prisma.profile.findMany(); }
  async findById(id: string) { return prisma.profile.findUnique({ where: { id } }); }
  async update(id: string, data: Prisma.ProfileUncheckedUpdateInput) { return prisma.profile.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.profile.delete({ where: { id } }); }
}
