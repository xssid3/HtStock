import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum WalletType {
  BUYER = 'buyer',
  ESCROW = 'escrow',
  EARNINGS = 'earnings',
  PLATFORM = 'platform',
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  PURCHASE = 'purchase',
  ESCROW_HOLD = 'escrow_hold',
  ESCROW_RELEASE = 'escrow_release',
  WITHDRAWAL = 'withdrawal',
  REFUND = 'refund',
}

@Entity('wallet_transactions')
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true }) // null for platform wallet
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: WalletType,
  })
  walletType: WalletType;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  amountUsd: number;

  @Column({ type: 'enum', enum: ['credit', 'debit'] })
  direction: 'credit' | 'debit';

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  balanceBefore: number;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  balanceAfter: number;

  @Column({ nullable: true })
  referenceId: string; // Order or Dispute ID

  @CreateDateColumn()
  createdAt: Date;
}
