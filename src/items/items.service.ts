import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-items.dto';
import { FilesService } from 'src/files/files.service';
import { CategoriesService } from 'src/category/category.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private ItemRepository: typeof Item,
    private categoriesService: CategoriesService,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateItemDto, image: any) {
    const category = await this.categoriesService.getCategoryBytitle(
      dto.categoryId,
    );
    console.log(category);

    const fileName = await this.fileService.createFile(image);
    const Item = await this.ItemRepository.create({ ...dto, image: fileName });
    return Item;
  }
}
