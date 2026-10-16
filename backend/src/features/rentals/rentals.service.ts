import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';

@Injectable()
export class RentalsService {
  create(createRentalDto: CreateRentalDto) {
    return 'This action adds a new rental';
  }

  findAll() {
    return `This action returns all rentals`;
  }

  findOne(id: string) {
    return `This action returns a #${id} rental`;
  }

  update(id: string, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: string) {
    return `This action removes a #${id} rental`;
  }
}
