import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';
import { hashPassword } from '../utils/hash';

export class UsersService {
  async getAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        profileId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: true
      }
    });
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        profileId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: true
      }
    });

    if (!user) throw new AppError('Usuario no encontrado', 404);
    return user;
  }

  async create(data: { email: string; passwordHash: string; profileId: string; isActive?: boolean }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new AppError('El email ya está en uso', 400);

    const hashedPassword = await hashPassword(data.passwordHash);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        passwordHash: hashedPassword
      }
    });

    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async update(id: string, data: { email?: string; passwordHash?: string; profileId?: string; isActive?: boolean }) {
    await this.getById(id);

    const updateData = { ...data };
    if (updateData.passwordHash) {
      updateData.passwordHash = await hashPassword(updateData.passwordHash);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    const { passwordHash: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id: string) {
    await this.getById(id);
    await prisma.user.delete({ where: { id } });
    return true;
  }
}

export const usersService = new UsersService();
