import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  loginExisitingUser(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  registerNewUser(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  getUserCredentials() {
    return `This action returns all auth`;
  }
}
