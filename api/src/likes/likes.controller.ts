import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { TokenGuard } from '../auth/token.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(TokenGuard)
  @Get()
  async list(@Req() req): Promise<{ data: Like[] }> {
    const data = await this.likesService.findAll(req.user.login);
    return { data };
  }

  @UseGuards(TokenGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req, @Body() dto: CreateLikeDto): Promise<Like> {
    return this.likesService.create({
      cat_id: dto.cat_id,
      user_login: req.user.login,
    });
  }

  @UseGuards(TokenGuard)
  @Delete(':cat_id')
  @HttpCode(HttpStatus.OK)
  async remove(@Req() req, @Param('cat_id') cat_id: string): Promise<void> {
    await this.likesService.remove(cat_id, req.user.login);
  }
}
