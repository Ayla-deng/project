-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
