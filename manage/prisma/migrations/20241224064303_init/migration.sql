/*
  Warnings:

  - A unique constraint covering the columns `[productName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");
