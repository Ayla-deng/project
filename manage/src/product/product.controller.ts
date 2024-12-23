/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
//ParseIntPipe:它将拦截字符串类型的参数，并在将其传递给适当的路由处理程序之前自动将其解析为数字。这也具有在 Swagger 中将参数正确记录为数字的优势
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

//向类中添加一个装饰器，以在Swagger中将所有端点组合在一起
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  // 添加Swagger响应类型
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productService.findAll();
  }

  // { where: { published: true } }
  // @Get('drafts')
  // findDrafts() {
  //   return this.productService.findDrafts();
  // }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  // return this.productService.findOne(+id);
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.productService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return article;
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
