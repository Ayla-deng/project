/* eslint-disable prettier/prettier */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 创建两个样板商品信息
async function main() {
  const product1 = await prisma.product.create({
    data: {
      userId: 1,
      productName: '样板商品1',
      productDescription: '这是第一个样板商品的详细描述',
      productPrice: 99.99,
      productStock: 100,
      productImage: 'image1.jpg',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      userId: 2,
      productName: '样板商品2',
      productDescription: '这是第二个样板商品的详细描述',
      productPrice: 199.99,
      productStock: 50,
      productImage: 'image2.jpg',
    },
  });

  console.log({ product1, product2 })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });