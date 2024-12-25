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

  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(await this.productService.create(createProductDto));
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll() {
    const products = await this.productService.findAll();
    return products.map(product => new ProductEntity(product));
  }

  // { where: { published: true } }
  // @Get('drafts')
  // findDrafts() {
  //   return this.productService.findDrafts();
  // }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOne(id);
    if (!product) {
      return new NotFoundException(`Product with ${id} does not exist.`);
    } else {
      return new ProductEntity(await this.productService.findOne(id));
    }
  }


  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return new ProductEntity(await this.productService.update(id, updateProductDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ProductEntity(await this.productService.remove(id));
  }
}
