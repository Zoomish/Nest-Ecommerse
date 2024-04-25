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
import { CategoriesService } from './category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './model/category.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @ApiOperation({ summary: 'Создать категорию' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, type: Category })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createItem(@Body() dto: CreateCategoryDto, @UploadedFile() image) {
    return this.categoryService.createCategory(dto, image);
  }

  @ApiOperation({ summary: 'Получить все категории' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'Получить категорию по значению' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.categoryService.getCategoryBytitle(value);
  }

  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Обновить категорию' })
  @ApiResponse({ status: 200, type: Category })
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateCategory(
    @Param('id') id: number,
    @Body() dto: CreateCategoryDto,
    @UploadedFile() image,
  ) {
    return this.categoryService.updateCategory(id, dto, image);
  }
}
