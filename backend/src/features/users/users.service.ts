import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UUID } from 'crypto';
import { UserResponseMessage } from './constants/user-response-messages.js';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findOne(userId: UUID) {
    const result = this.prisma.users.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
    const user = await result;
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NOT_FOUND);
    }
    return user;
  }
}
