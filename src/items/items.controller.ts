import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-items.dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @UseInterceptors(FileInterceptor('image'))
  createItem(@Body() dto: CreateItemDto, @UploadedFile() image) {
    return this.itemsService.create(dto, image);
  }
}
