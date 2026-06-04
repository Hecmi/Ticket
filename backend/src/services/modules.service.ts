import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export class ModulesService {
  async getAll() {
    return prisma.module.findMany({ include: { options: true } });
  }

  async getById(id: string) {
    const module = await prisma.module.findUnique({
      where: { id },
      include: { options: true }
    });

    if (!module) throw new AppError('Módulo no encontrado', 404);
    return module;
  }

  async create(data: { name: string; code: string }) {
    const existing = await prisma.module.findFirst({
      where: { OR: [{ name: data.name }, { code: data.code }] }
    });

    if (existing) throw new AppError('El módulo ya existe con ese nombre o código', 400);

    return prisma.module.create({ data });
  }

  async update(id: string, data: { name?: string; code?: string }) {
    await this.getById(id);
    return prisma.module.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.getById(id);
    await prisma.module.delete({ where: { id } });
    return true;
  }
}

export const modulesService = new ModulesService();
