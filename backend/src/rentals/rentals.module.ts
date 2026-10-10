import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { RentalsController } from './rentals.controller.js';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
