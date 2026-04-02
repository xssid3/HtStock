import { Controller, Post, Body, Get, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockItem, StockItemStatus } from './entities/stock-item.entity';
import { Listing } from '../listings/entities/listing.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('listings/:listingId/stock')
@UseGuards(JwtAuthGuard)
export class StockController {
  constructor(
    @InjectRepository(StockItem)
    private stockItemRepository: Repository<StockItem>,
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
  ) {}

  @Get()
  async getStock(@Param('listingId') listingId: string) {
    const listing = await this.listingRepository.findOneBy({ id: listingId });
    if (!listing) throw new HttpException('Listing not found', HttpStatus.NOT_FOUND);

    return this.stockItemRepository.find({
      where: { listing: { id: listingId } }
    });
  }

  @Post('upload')
  async uploadStock(
    @Param('listingId') listingId: string,
    @Body() payload: { bulkText: string }
  ) {
    const listing = await this.listingRepository.findOneBy({ id: listingId });
    if (!listing) throw new HttpException('Listing not found', HttpStatus.NOT_FOUND);

    // Splits text block into single items
    const lines = payload.bulkText.split('\n').filter(line => line.trim() !== '');

    // Check for duplicates in current stock (naive check for identical credentialData)
    const existingStock = await this.stockItemRepository.find({
      where: { listing: { id: listingId } },
      select: ['credentialData']
    });

    const existingCredentials = new Set(existingStock.map(s => s.credentialData));

    const newItems = lines.filter(line => !existingCredentials.has(line));
    const duplicatesCount = lines.length - newItems.length;

    // Insert unique ones
    const itemsToSave = newItems.map(credData => this.stockItemRepository.create({
      listing: listing,
      credentialData: credData,
      status: StockItemStatus.AVAILABLE
    }));

    await this.stockItemRepository.save(itemsToSave);

    // Synchronously update listing stock count
    const availableCount = await this.stockItemRepository.count({
      where: { listing: { id: listingId }, status: StockItemStatus.AVAILABLE }
    });

    listing.quantityRemaining = availableCount;
    await this.listingRepository.save(listing);

    return {
      success: true,
      importedCount: newItems.length,
      skippedDuplicates: duplicatesCount,
      message: `Processed ${lines.length} items. Imported ${newItems.length}, skipped ${duplicatesCount} duplicates.`
    };
  }

  @Delete(':itemId')
  async deleteStock(
    @Param('listingId') listingId: string,
    @Param('itemId') itemId: string
  ) {
    const item = await this.stockItemRepository.findOneBy({ id: itemId, listing: { id: listingId } });
    if (!item) throw new HttpException('Stock item not found', HttpStatus.NOT_FOUND);

    // Soft delete logic: instead of actual delete, we can update status
    // OR just remove it from available pool. For full soft delete we'd use @DeleteDateColumn
    // but the PRD specifies "seller can view/download deleted". So we set status to failed/deleted
    item.status = StockItemStatus.FAILED;
    await this.stockItemRepository.save(item);

    // Synchronously update listing stock count
    const availableCount = await this.stockItemRepository.count({
      where: { listing: { id: listingId }, status: StockItemStatus.AVAILABLE }
    });

    const listing = await this.listingRepository.findOneBy({ id: listingId });
    if (listing) {
      listing.quantityRemaining = availableCount;
      await this.listingRepository.save(listing);
    }

    return { success: true, message: `Stock item ${itemId} marked as failed/deleted.` };
  }
}