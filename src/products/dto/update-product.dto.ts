import { PartialType } from '@nestjs/mapped-types';
import { CreateNewProductDto } from './create-new-product.dto.js';

export class UpdateProductDto extends PartialType(CreateNewProductDto) {}
