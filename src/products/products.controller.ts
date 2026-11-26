import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateNewProductDto } from './dto/create-new-product.dto.js';
import { ProductsService } from './products.service.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createNewProduct(@Body() createNewProduct: CreateNewProductDto): any {
    return this.service.Create(createNewProduct);
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
  ): any {
    return this.service.update(id, updateProduct);
  }

  @Get()
  ProductList() {
    return this.service.productsList();
  }

  @Get('/:id')
  productDetails(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
