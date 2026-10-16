import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UUID } from 'crypto';

@Injectable()
export class RentalsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    createRentalDto: CreateRentalDto,
    ownerId: UUID
  ) {
    await this.prisma.rentals.create({
      data: {
        name: createRentalDto.name,
        surface: createRentalDto.surface,
        price: createRentalDto.price,
        picture: createRentalDto.picture,
        description: createRentalDto.description,
        owner_id: ownerId,
      },
      select: {
        id: true,
        name: true,
        surface: true,
        price: true,
        picture: true,
        description: true,
        owner_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    
    return { 
      message: "Rental created!" 
    };
  }

  async findAll() {
    const result = this.prisma.rentals.findMany({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        name: true,
        surface: true,
        price: true,
        picture: true,
        description: true,
        owner_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    return result;
  }

  async findOne(rentalId: UUID) {
    const result = this.prisma.rentals.findFirst({
      where: { 
        id: rentalId,
      },
      select: {
        id: true,
        name: true,
        surface: true,
        price: true,
        picture: true,
        description: true,
        owner_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (!result) {
      throw new NotFoundException('Rental not found');
    }
    return result;
  }

  async update(rentalId: UUID, ownerId: UUID, updateRentalDto: UpdateRentalDto,) {
    const result = await this.prisma.rentals.updateMany({
      where: {
        id: rentalId,
        owner_id: ownerId,
      },
      data: updateRentalDto
    });

    if (result.count === 0) {
      throw new NotFoundException('Rental not found');
    }

    return {
      message: 'Rental updated!',
    };
  }

  // async remove(rentalId: UUID, ownerId: UUID) {
  //   const result = await this.prisma.rentals.deleteMany({
  //     where: {
  //       id: rentalId,
  //       owner_id: ownerId
  //     }
  //   });
  //   if (result.count === 0) {
  //     throw new NotFoundException('Rental not found');
  //   }
  // }
}
