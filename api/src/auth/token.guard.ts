import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth: string = req.headers['authorization'];
    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = auth.split(' ')[1];
    const user = await this.usersService.findByToken(token);
    if (!user) throw new UnauthorizedException();
    req.user = user;
    return true;
  }
}
