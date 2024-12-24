/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  // 增删改查操作 C（Create）：创建，指新增数据。
  // R（Retrieve）：检索，指查询数据。
  // U（Update）：更新，指修改数据。
  // D（Delete）：删除，指移除数据。
  constructor(private prisma: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto
    });
  }

  findAll() {
    // return `This action returns all product`;
    return this.prisma.product.findMany();
  }

  // { where: { published: true } }
  // findDrafts() {
  //   return this.prisma.product.findMany({ where: { published: false } });
  // }

  findOne(id: number) {
    // return `This action returns a #${id} product`;
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // return `This action updates a #${id} product`;
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  remove(id: number) {
    // return `This action removes a #${id} product`;
    return this.prisma.product.delete({ where: { id } });
  }
}
