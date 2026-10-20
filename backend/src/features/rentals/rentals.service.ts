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
    ownerId: UUID,
    picture?: Express.Multer.File,
  ) {
    await this.prisma.rentals.create({
      data: {
        name: createRentalDto.name,
        surface: createRentalDto.surface,
        price: createRentalDto.price,
        picture: picture
          ? `/uploads/rentals/${picture.filename}`
          : createRentalDto.picture,
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
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    const rentals = (await result).map(({ users, ...rental }) => ({
      ...rental,
      owner: users,
    }));

    return { rentals };
  }

  async findOne(rentalId: number) {
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
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    const rental = await result;
    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    const { users, ...rentalData } = rental;
    return {
      ...rentalData,
      owner: users,
    };
  }

  async update(
    rentalId: number,
    ownerId: UUID,
    updateRentalDto: UpdateRentalDto,
    picture?: Express.Multer.File,
  ) {
    const result = await this.prisma.rentals.updateMany({
      where: {
        id: rentalId,
        owner_id: ownerId,
      },
      data: {
        ...updateRentalDto,
        ...(picture
          ? { picture: `/uploads/rentals/${picture.filename}` }
          : {}),
      },
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
