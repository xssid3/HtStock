import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Listing } from '../../listings/entities/listing.entity';
import { StockItem } from '../../stock/entities/stock-item.entity';

export enum OrderStatus {
  PENDING_PAYMENT = 'pending_payment',
  AWAITING_DELIVERY = 'awaiting_delivery',
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
  DISPUTED = 'disputed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @ManyToOne(() => StockItem, { nullable: true })
  @JoinColumn({ name: 'stockItemId' })
  stockItem: StockItem;

  @Column({ type: 'jsonb' })
  listingSnapshot: any; // Immutable copy of listing at time of purchase

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  priceUsd: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING_PAYMENT,
  })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  manualDeliveryData: string;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  autoConfirmAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
