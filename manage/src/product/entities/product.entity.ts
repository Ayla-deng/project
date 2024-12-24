/* eslint-disable prettier/prettier */
import { Product } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";
// import { UserEntity } from 'src/user/entities/user.entity';

export class ProductEntity implements Product {
  userId: number;

  @ApiProperty()
  id: number;

  // @ApiProperty()
  // userId: number;
  @ApiProperty({ required: false, nullable: true })
  productUserId: number | null;

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
