import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    return prisma.user.create({ data });
  }

  async findAll() {
    return prisma.user.findMany({
      include: { profile: true }, // Incluimos la relación del perfil
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, data: Prisma.UserUncheckedUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
