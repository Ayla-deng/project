/* eslint-disable prettier/prettier */
import { Product } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productName: string;

  @ApiProperty({ required: false })
  productDescription: string | null;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  productStock: number;

  @ApiProperty()
  productImage: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
