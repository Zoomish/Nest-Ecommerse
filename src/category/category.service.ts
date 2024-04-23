import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private roleService: RolesService,
  ) {}

  async getAllCategories() {
    const category = await this.categoryRepository.findAll({
      include: { all: true },
    });
    return category;
  }

  async getCategoryBytitle(title) {
    const category = await this.categoryRepository.findOne({
      where: { title },
      include: { all: true },
    });
    return category;
  }
}
