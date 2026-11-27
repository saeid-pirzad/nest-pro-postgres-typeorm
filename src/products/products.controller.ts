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
import { JwtAuthGuard } from '../common/auth/jwt-auth-guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

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
