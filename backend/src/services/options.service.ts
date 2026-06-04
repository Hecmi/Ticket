import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export class OptionsService {
  async getAll() {
    return prisma.option.findMany({ include: { module: true } });
  }

  async getById(id: string) {
    const option = await prisma.option.findUnique({
      where: { id },
      include: { module: true }
    });

    if (!option) throw new AppError('Opción no encontrada', 404);
    return option;
  }

  async create(data: { name: string; code: string; routePath?: string; moduleId: string }) {
    const existing = await prisma.option.findFirst({
      where: { code: data.code }
    });

    if (existing) throw new AppError('La opción ya existe con ese código', 400);

    return prisma.option.create({ data });
  }

  async update(id: string, data: { name?: string; code?: string; routePath?: string; moduleId?: string }) {
    await this.getById(id);
    return prisma.option.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.getById(id);
    await prisma.option.delete({ where: { id } });
    return true;
  }
}

export const optionsService = new OptionsService();
