import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  rental_id: number;

  @ApiPropertyOptional({
    example: '91a983c3-9a9d-4101-8638-689f20bbbc14',
    description: 'Legacy client field. The authenticated JWT user is used instead.',
  })
  @IsOptional()
  user_id?: string | number;

  @ApiProperty({
    example: 'I am interested in this rental.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;
}