import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ListingsModule } from './listings/listings.module';
import { StockModule } from './stock/stock.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { WalletsModule } from './wallets/wallets.module';

import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Listing } from './listings/entities/listing.entity';
import { StockItem } from './stock/entities/stock-item.entity';
import { Order } from './orders/entities/order.entity';
import { WalletTransaction } from './wallets/entities/wallet-transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'htstock',
      entities: [User, Category, Listing, StockItem, Order, WalletTransaction],
      synchronize: process.env.NODE_ENV !== 'production', // Use carefully in production
    }),
    UsersModule,
    AuthModule,
    ListingsModule,
    StockModule,
    CategoriesModule,
    OrdersModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
