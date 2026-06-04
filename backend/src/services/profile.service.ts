import { ProfileRepository } from '../repositories/profile.repository';
import { Prisma } from '@prisma/client';

export class ProfileService {
  private repository = new ProfileRepository();

  async create(data: Prisma.ProfileUncheckedCreateInput) { return this.repository.create(data); }
  async getAll() { return this.repository.findAll(); }
  async getById(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Profile not found');
    return record;
  }
  async update(id: string, data: Prisma.ProfileUncheckedUpdateInput) { return this.repository.update(id, data); }
  async delete(id: string) {
    const record = await this.repository.findById(id);
    if (!record) throw new Error('Profile not found');
    return this.repository.delete(id);
  }
}
