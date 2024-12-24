/*
  Warnings:

  - You are about to drop the column `productuserId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productuserId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productuserId",
ADD COLUMN     "productUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productUserId_fkey" FOREIGN KEY ("productUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
