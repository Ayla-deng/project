/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  // 创建两个样板用户信息
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {},
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: 'password-sabin',
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {},
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: 'password-alex',
    },
  });

  // 创建两个样板商品信息
  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {
      productUserId: user1.id,
    },
    create: {
      // data: {
      productUserId: user1.id,
      productName: '样板商品1',
      // category: '样板分类1',
      productDescription: '这是第一个样板商品的详细描述',
      productPrice: 99.99,
      productStock: 100,
      productImage: 'image1.jpg',
    },
  });

  // await prisma.product.create
  const product2 = await prisma.product.upsert({
    where: { id: 2 },
    update: { productUserId: user1.id },
    create: {
      productUserId: user2.id,
      productName: '样板商品2',
      productDescription: '这是第二个样板商品的详细描述',
      productPrice: 199.99,
      productStock: 50,
      productImage: 'image2.jpg',
    },
  });

  console.log({ user1, user2, product1, product2 })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });