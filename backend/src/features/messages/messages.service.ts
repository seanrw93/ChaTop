import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UUID } from 'crypto';
import { MessageResponseMessage } from './constants/message-response-messages.js';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    userId: UUID,
  ) {
    const rental = await this.prisma.rentals.findUnique({
      where: {
        id: createMessageDto.rental_id,
      },
    });

    if (!rental) {
      throw new NotFoundException(MessageResponseMessage.RENTAL_NOT_FOUND);
    }

    await this.prisma.messages.create({
      data: {
        rental_id: createMessageDto.rental_id,
        user_id: userId,
        message: createMessageDto.message,
      },
    });

    return {
      message: MessageResponseMessage.SENT,
    };
  }
}
