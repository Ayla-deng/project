/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `productImage` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "productImage" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_userId_key" ON "Product"("userId");
