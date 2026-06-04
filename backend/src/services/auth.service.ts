import { prisma } from '../database/prisma';
import { comparePassword, hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    if (!user.isActive) {
      throw new AppError('El usuario está inactivo', 403);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = generateToken({
      userId: user.id,
      profileId: user.profileId,
    });

    // To prevent returning password hash
    const { passwordHash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async register(name: string, email: string, password: string, roleName: string = 'USER') {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('El email ya está registrado', 400);
    }

    let profile = await prisma.profile.findUnique({ where: { name: roleName } });
    if (!profile) {
      profile = await prisma.profile.create({
        data: { name: roleName, description: 'Created automatically' }
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        profileId: profile.id
      },
      include: { profile: true }
    });

    const token = generateToken({
      userId: user.id,
      profileId: user.profileId,
    });

    const { passwordHash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}

export const authService = new AuthService();
