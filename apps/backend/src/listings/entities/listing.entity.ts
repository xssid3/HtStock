import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

export enum ListingStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  ACTIVE = 'active',
  SOLD = 'sold',
  REJECTED = 'rejected',
  HIDDEN = 'hidden',
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  priceUsd: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 1 })
  quantityRemaining: number;

  @Column({
    type: 'enum',
    enum: ['manual', 'auto'],
    default: 'auto',
  })
  deliveryType: string;

  @Column({ nullable: true })
  deliverySlaHours: number;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.DRAFT,
  })
  status: ListingStatus;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: any; // Category specific attributes

  @Column({ type: 'simple-array', default: [] })
  tags: string[];

  @Column({ type: 'simple-array', default: [] })
  proofUrls: string[];

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ default: 0 })
  wishlistCount: number;

  @Column({ default: false })
  boostActive: boolean;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: false })
  featured: boolean;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
  discountPriceUsd: number;

  @Column({ nullable: true })
  wholesaleMinQty: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true })
  wholesaleDiscountPct: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
