import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entites/order.entity.js';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderItem } from './entites/order-item.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if (!Array.isArray(createOrderDto?.items?.data)) {
      throw new BadRequestException('items.data must be an array');
    }

    const order = this.orderRepository.create({
      userId: createOrderDto.userId,
      totalAmount: createOrderDto.totalAmount,
      item: [],
    });

    const result = await this.orderRepository.save(order);

    const orderId = result.id;

    for (const orderItem of createOrderDto.items.data) {
      const myOrder = this.orderItemRepository.create({
        orderId: orderId,
        price: orderItem.price,
        quantity: orderItem.quantity,
        productId: orderItem.productId,
      });

      await this.orderItemRepository.save(myOrder);
    }
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: { item: { product: true }, user: true },
    });
  }

  async orderList() {
    return await this.orderRepository.find();
  }
}
