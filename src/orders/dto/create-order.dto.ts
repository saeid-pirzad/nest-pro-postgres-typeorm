import {
  IsInt,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';

export class OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export class OrderItemObject {
  data: OrderItem[];
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsObject()
  items: OrderItemObject;
}
