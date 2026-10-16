import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "John Smith" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'p@ssword\'123' })
  @IsString()
  @MinLength(8)
  password: string;
}