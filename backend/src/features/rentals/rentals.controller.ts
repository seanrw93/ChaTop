import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { RentalsService } from './rentals.service.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request.js'
import type { UUID } from 'crypto'

@Controller('rentals')
@ApiTags('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('picture'))
  @ApiOperation({ summary: 'Create a rental' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'surface', 'price', 'description'],
      properties: {
        name: { type: 'string', example: 'Appartement Paris' },
        surface: { type: 'number', example: 50 },
        price: { type: 'number', example: 1200 },
        picture: { type: 'string', format: 'binary' },
        description: {
          type: 'string',
          example: 'A spacious apartment in central Paris.',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Rental created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  create(
    @Body() createRentalDto: CreateRentalDto,
    @Req() request: AuthenticatedRequest,
    @UploadedFile() picture?: Express.Multer.File,
  ) {
    return this.rentalsService.create(
      createRentalDto,
      request.user.userId,
      picture,
    );
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({ status: 200, description: 'All rentals returned' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a rental by ID' })
  @ApiParam({
    name: 'id',
    description: 'Rental UUID',
    format: 'uuid',
    example: '91a983c3-9a9d-4101-8638-689f20bbbc14',
  })
  @ApiResponse({ status: 200, description: 'Rental returned' })
  @ApiResponse({ status: 400, description: 'Invalid rental UUID' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  @ApiResponse({ status: 404, description: 'Rental not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('picture'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a rental' })
  @ApiParam({
    name: 'id',
    description: 'Rental UUID',
    format: 'uuid',
    example: '91a983c3-9a9d-4101-8638-689f20bbbc14',
  })
  @ApiResponse({ status: 200, description: 'Rental updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or invalid UUID' })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT' })
  @ApiResponse({ status: 404, description: 'Rental not found' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Req() request: AuthenticatedRequest,
    @Body() updateRentalDto: UpdateRentalDto,
    @UploadedFile() picture?: Express.Multer.File,
  ) {
    return this.rentalsService.update(
      id, 
      request.user.userId,
      updateRentalDto,
      picture,
    );
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(
  //   @Param('id', ParseUUIDPipe) id: UUID,
  //   @Req() request: AuthenticatedRequest
  // ) {
  //   return this.rentalsService.remove(
  //     id,
  //     request.user.userId
  //   );
  // }
}
