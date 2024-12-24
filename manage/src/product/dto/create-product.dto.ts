/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  @ApiProperty({ required: false })
  productDescription?: string;

  @IsNotEmpty()
  @ApiProperty()
  productPrice: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  productStock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productImage: string;

  // @ApiProperty({ required: false, default: false })
  // published?: boolean = false;
}
