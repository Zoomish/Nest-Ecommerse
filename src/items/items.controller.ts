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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from './model/items.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Создать товар' })
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(RolesGuard)
  @ApiResponse({ status: 200, type: Item })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createItem(@Body() dto: CreateItemDto, @UploadedFile() image) {
    return this.itemsService.create(dto, image);
  }

  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: 200, type: [Item] })
  @Get()
  getAll() {
    return this.itemsService.getAllItems();
  }

  @ApiOperation({ summary: 'Обновить товар' })
  @ApiResponse({ status: 200, type: Item })
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(RolesGuard)
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
