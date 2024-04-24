import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-items.dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from './items.model';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Создать категорию' })
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
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

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  updateCategory(
    @Param('id') id: number,
    @Body() dto: CreateItemDto,
    @UploadedFile() image,
  ) {
    return this.itemsService.updateItem(id, dto, image);
  }
}
