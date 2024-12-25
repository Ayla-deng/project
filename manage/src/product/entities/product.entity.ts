/* eslint-disable prettier/prettier */
import { Product } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";
//使用UserEntity解决password再次公开问题
import { UserEntity } from 'src/user/entities/user.entity';

export class ProductEntity implements Product {
  userId: number;

  @ApiProperty()
  id: number;

  // @ApiProperty()
  // userId: number;
  @ApiProperty({ required: false, nullable: true })
  productUserId: number | null;

  @ApiProperty({ required: false, nullable: true })
  productCategoryId: number | null;

  // 商品和用户一起返回的前提下，隐藏password字段 *******start******
  @ApiProperty({ required: false, type: UserEntity })
  productUser?: UserEntity;

  constructor({ productUser, ...data }: Partial<ProductEntity>) {
    Object.assign(this, data);

    if (productUser) {
      this.productUser = new UserEntity(productUser);
    }
  }
  //*****************end******************* */

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
