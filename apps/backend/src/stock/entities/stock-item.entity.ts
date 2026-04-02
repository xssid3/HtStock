import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';

export enum StockItemStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold',
  FAILED = 'failed',
}

@Entity('listing_stock_items')
export class StockItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @Column({
    type: 'enum',
    enum: StockItemStatus,
    default: StockItemStatus.AVAILABLE,
  })
  status: StockItemStatus;

  @Column({ type: 'text' })
  credentialData: string; // Stored as raw string from textbox bulk input

  @Column({ nullable: true })
  orderId: string; // Foreign key to Orders (to be created)

  @Column({ type: 'timestamp', nullable: true })
  reservedUntil: Date;

  @Column({ type: 'timestamp', nullable: true })
  soldAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
