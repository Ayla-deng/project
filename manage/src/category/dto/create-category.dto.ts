/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  parentCategoryId: number;
}
