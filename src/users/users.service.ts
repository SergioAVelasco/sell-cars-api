import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const found = await this.repo.find({ where: { id } });
    if (found.length === 0) {
      throw new Error('User not found');
    }
    return found[0];
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    console.log('Updating user with id', id);
    const user = await this.findOne(id);
    console.log('User found', user);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    console.log('User after update', user);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    console.log('Usuario', user);
    if (!user) {
      throw new Error('User not found');
    }
    return this.repo.remove(user);
  }
}
