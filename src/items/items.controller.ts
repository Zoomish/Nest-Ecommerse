import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-items.dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './items.model';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Создать категорию' })
  @ApiResponse({ status: 200, type: Item })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createItem(@Body() dto: CreateItemDto, @UploadedFile() image) {
    return this.itemsService.create(dto, image);
  }

  @ApiOperation({ summary: 'Создать категорию' })
  @ApiResponse({ status: 200, type: [Item] })
  @Get()
  getAll() {
    return this.itemsService.getAllItems();
  }
}
