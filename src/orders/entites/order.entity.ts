import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { OrderItem } from './order-item.entity.js';

export enum orderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: orderStatus, default: orderStatus.PENDING })
  status: orderStatus;

  @Column('float')
  totalAmount: number;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  item: Relation<OrderItem[]>;

  @CreateDateColumn()
  createAt: Date;
}
