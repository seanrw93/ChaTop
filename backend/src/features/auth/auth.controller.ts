import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import type { UUID } from 'crypto';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { Public } from '../../common/decorators/public.decorator.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: UUID;
    email: string;
  };
};

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email is already registered' })
  registerNewUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerNewUser(registerDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({ status: 201, description: 'JWT access token returned' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  loginExistingUser(@Body() loginDto: LoginDto) {
    return this.authService.loginExistingUser(loginDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated user' })
  @ApiResponse({ status: 200, description: 'Authenticated user returned' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  getUserCredentials(@Req() request: AuthenticatedRequest) {
    return this.authService.getUserCredentials(request.user.userId);
  } 

}
