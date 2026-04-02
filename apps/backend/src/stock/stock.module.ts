import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockItem } from './entities/stock-item.entity';
import { Listing } from '../listings/entities/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockItem, Listing])],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}