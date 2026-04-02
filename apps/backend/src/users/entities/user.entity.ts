import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  MODERATOR = 'moderator',
  SUPPORT = 'support',
  SUB_ADMIN = 'sub_admin',
  SUPER_ADMIN = 'super_admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  displayName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BUYER,
  })
  role: UserRole;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  emailVerifiedAt: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'suspended', 'banned', 'pending_verification'],
    default: 'active',
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  suspensionReason: string;

  @Column({ default: 0 })
  warningsCount: number;

  @Column({
    type: 'enum',
    enum: ['not_applied', 'pending', 'approved', 'rejected'],
    default: 'not_applied',
  })
  sellerStatus: string;

  @Column({
    type: 'enum',
    enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
    nullable: true,
  })
  sellerTier: string;

  @Column({ default: 0 })
  completedSales: number;

  @Column({ type: 'decimal', precision: 20, scale: 8, default: 0 })
  totalGmvUsd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  trustScore: number;

  @Column({ default: false })
  twoFaEnabled: boolean;

  @Column({ nullable: true })
  twoFaSecret: string;

  @Column({ type: 'jsonb', default: {} })
  notificationPrefs: any;

  @Column({ type: 'jsonb', default: {} })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
