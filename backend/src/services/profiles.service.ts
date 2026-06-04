import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export class ProfilesService {
  async getAll() {
    return prisma.profile.findMany({
      include: {
        profileOptions: {
          include: { option: true }
        }
      }
    });
  }

  async getById(id: string) {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        profileOptions: {
          include: { option: true }
        }
      }
    });

    if (!profile) {
      throw new AppError('Perfil no encontrado', 404);
    }
    return profile;
  }

  async create(data: { name: string; description?: string; optionIds?: string[] }) {
    const { name, description, optionIds } = data;

    const existing = await prisma.profile.findUnique({ where: { name } });
    if (existing) {
      throw new AppError('Ya existe un perfil con ese nombre', 400);
    }

    return prisma.profile.create({
      data: {
        name,
        description,
        profileOptions: {
          create: optionIds?.map(id => ({ optionId: id })) || []
        }
      },
      include: {
        profileOptions: true
      }
    });
  }

  async update(id: string, data: { name?: string; description?: string; optionIds?: string[] }) {
    const { name, description, optionIds } = data;

    await this.getById(id);

    return prisma.$transaction(async (tx) => {
      // If options are provided, replace them all
      if (optionIds !== undefined) {
        await tx.profileOption.deleteMany({ where: { profileId: id } });
        if (optionIds.length > 0) {
          await tx.profileOption.createMany({
            data: optionIds.map(oId => ({ profileId: id, optionId: oId }))
          });
        }
      }

      return tx.profile.update({
        where: { id },
        data: { name, description },
        include: { profileOptions: { include: { option: true } } }
      });
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await prisma.profile.delete({ where: { id } });
    return true;
  }
}

export const profilesService = new ProfilesService();
