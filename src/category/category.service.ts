import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private fileService: FilesService,
  ) {}

  async createCategory(dto: CreateCategoryDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const Item = await this.categoryRepository.create({
      ...dto,
      image: fileName,
    });
    return Item;
  }

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

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return category as Category;
  }

  async updateCategory(id: number, dto: CreateCategoryDto, image: any) {
    const category = await this.getCategoryById(id);
    if (image) {
      const fileName = await this.fileService.createFile(image);
      category.image = fileName;
      category.title = dto.title;
      await category.save();
    }
    return category;
  }
}
