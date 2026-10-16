import { Injectable, ConflictException, UnauthorizedException, } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js'
import { PrismaService } from '../../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { ResponseMessage } from './contants/responses.contant.js'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

 async loginExistingUser(loginDto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(ResponseMessage.INVALID_CREDENTIALS);
    }

    const passwordIsValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException(ResponseMessage.INVALID_CREDENTIALS);
    }

    return {
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
  

async registerNewUser(registerDto: RegisterDto) {
  const hashedPassword = await bcrypt.hash(registerDto.password, 12);

  try {
    const user = await this.prisma.users.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
      },
    });

    return {
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };

  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(ResponseMessage.EMAIL_ALREADY_REGISTERED);
    }

    throw error;
  }
}

async getUserCredentials(userId: UUID) {
   const user = await this.prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user) {
    throw new UnauthorizedException(ResponseMessage.USER_NO_LONGER_EXISTS);
  }

  return user;
  }
}
