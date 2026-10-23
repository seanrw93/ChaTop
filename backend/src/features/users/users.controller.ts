import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import type { UUID } from 'crypto';

@Controller('user')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    format: 'uuid',
    example: '4168a00d-7e5e-4be3-a910-993820790494',
  })
  @ApiResponse({ status: 200, description: 'User returned' })
  @ApiResponse({ status: 400, description: 'Invalid user UUID' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.findOne(id);
  }
}