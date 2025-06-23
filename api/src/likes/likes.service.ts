import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private likeRepo: Repository<Like>) {}

  async findAll(user_login: string): Promise<Like[]> {
    return this.likeRepo.find({ where: { user_login } });
  }

  async create(dto: CreateLikeDto & { user_login: string }): Promise<Like> {
    const like = this.likeRepo.create({
      cat_id: dto.cat_id,
      user_login: dto.user_login,
    });
    return this.likeRepo.save(like);
  }

  async remove(cat_id: string, user_login: string): Promise<void> {
    const result = await this.likeRepo.delete({ cat_id, user_login });
    if (!result.affected) {
      throw new NotFoundException(`Like  ${cat_id} not found`);
    }
  }
}
