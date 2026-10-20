import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ example: 'Appartement Paris' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  surface: number;

  @ApiProperty({ example: 1200 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiPropertyOptional({
    example: 'https://example.com/apartment.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  picture?: string;

  @ApiProperty({ example: 'A spacious apartment in central Paris.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}