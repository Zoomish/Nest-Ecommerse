import { Controller, Get, UseGuards } from '@nestjs/common';
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

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

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
