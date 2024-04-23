import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
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
