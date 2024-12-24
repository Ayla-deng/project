/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_categoryName_key" ON "ProductCategory"("categoryName");
