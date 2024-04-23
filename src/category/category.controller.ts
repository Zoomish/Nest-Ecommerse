import {
  Body,
  Controller,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.model';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @UseInterceptors(FileInterceptor('image'))
  createItem(@Body() dto: CreateCategoryDto, @UploadedFile() image) {
    return this.categoryService.createCategory(dto, image);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.categoryService.getRoleByValue(value);
  }
}
