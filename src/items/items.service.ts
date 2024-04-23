import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const category = await this.categoriesService.getCategoryById(
      dto.categoryId,
    );
    if (image) {
      console.log(image);
      const fileName = await this.fileService.createFile(image);
      const Item = await this.ItemRepository.create({
        ...dto,
        image: fileName,
      });
      if (category && Item) {
        await Item.$add('category', category.id);
        return Item;
      }
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    const Item = await this.ItemRepository.create({
      ...dto,
    });
    console.log(Item);

    if (category && Item) {
      await Item.$add('category', category);
      return Item;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async getAllItems() {
    const category = await this.ItemRepository.findAll({
      include: { all: true },
    });
    return category;
  }
}
