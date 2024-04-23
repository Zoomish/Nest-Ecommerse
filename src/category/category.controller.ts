import {
  Body,
  Controller,
  Get,
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
import { User } from 'src/users/users.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @UseInterceptors(FileInterceptor('image'))
  createItem(@Body() dto: CreateCategoryDto, @UploadedFile() image) {
    return this.categoryService.createCategory(dto, image);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }
}
