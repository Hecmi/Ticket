import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { Prisma } from '@prisma/client';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: Prisma.UserUncheckedCreateInput) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(data.passwordHash, 10);
    return this.userRepository.create({
      ...data,
      passwordHash: hashedPassword,
    });
  }

  async getUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: Prisma.UserUncheckedUpdateInput & { password?: string }) {
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email as string);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email is already in use');
      }
    }

    let updateData: Prisma.UserUncheckedUpdateInput = { ...data };
    
    // If a new password is provided, hash it before saving
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
      delete (updateData as any).password;
    }

    return this.userRepository.update(id, updateData);
  }

  async deleteUser(id: string) {
    // Verificar si existe antes de eliminar (opcional, pero buena práctica)
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.delete(id);
  }
}
