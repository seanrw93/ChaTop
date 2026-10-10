import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerNewUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.registerNewUser(createAuthDto);
  }

  @Post('login')
  loginExisitingUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.loginExisitingUser(createAuthDto);
  }

  @Get('me')
  getUserCredentials() {
    return this.authService.getUserCredentials();
  }

}
