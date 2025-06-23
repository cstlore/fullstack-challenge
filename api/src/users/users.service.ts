import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    let user = await this.userRepo.findOne({ where: { login: dto.login } });
    if (user) {
      return user;
    }
    const token = createHash('sha256')
      .update(dto.login + process.env.SECRET_SALT)
      .digest('hex');
    user = this.userRepo.create({ ...dto, token });
    return this.userRepo.save(user);
  }

  async findByToken(token: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { token } });
  }
}
