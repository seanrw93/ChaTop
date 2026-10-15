import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller.js';
import { RentalsController } from './rentals/rentals.controller.js';
import { MessagesController } from './messages/messages.controller.js';
import { RentalsService } from './rentals/rentals.service.js';
import { MessagesService } from './messages/messages.service.js';
import { AuthService } from './auth/auth.service.js';
import { AuthModule } from './auth/auth.module.js';
import { RentalsModule } from './rentals/rentals.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RentalsModule,
    MessagesModule,
    PrismaModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    })
  ],
  controllers: [AuthController, RentalsController, MessagesController],
  providers: [
    RentalsService, 
    MessagesService, 
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
