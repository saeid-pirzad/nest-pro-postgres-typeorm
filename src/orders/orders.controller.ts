import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  createNewOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.service.create(createOrderDto);
  }

  @Get()
  ordersList() {
    return this.service.orderList();
  }
}
