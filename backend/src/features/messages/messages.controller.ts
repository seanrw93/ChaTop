import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request.js';

@Controller('messages')
@ApiTags('messages')
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message about a rental' })
  @ApiBody({
    type: CreateMessageDto,
    description: 'The rental and message content. The sender is taken from the JWT.',
  })
  @ApiResponse({
    status: 200,
    description: 'Message sent successfully',
    schema: {
      example: {
        message: 'Message sent!',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  @ApiResponse({ status: 404, description: 'Rental not found' })
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.messagesService.create(
      createMessageDto,
      request.user.userId,
    );
  }
}
