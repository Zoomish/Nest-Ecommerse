import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './model/items.model';
import { CreateItemDto } from './dto/create-items.dto';
import { FilesService } from 'src/modules/files/files.service';
import { CategoriesService } from 'src/modules/category/category.service';

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
    console.log(category);

    if (image) {
      const fileName = await this.fileService.createFile(image);
      if (category && Object.keys(dto)) {
        const Item = await this.ItemRepository.create({
          ...dto,
          image: fileName,
        });
        return Item;
      }
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    if (category && Object.keys(dto)) {
      const Item = await this.ItemRepository.create({
        ...dto,
      });
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

  async getItemById(id: number) {
    const item = await this.ItemRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return item as Item;
  }

  async updateItem(id: number, dto: CreateItemDto, image: any) {
    const item = await this.getItemById(id);
    console.log(image);

    if (image) {
      const fileName = await this.fileService.createFile(image);
      item.image = fileName;
    }
    item.title = dto.title ? dto.title : item.title;
    item.price = dto.price ? dto.price : item.price;
    item.description = dto.description ? dto.description : item.description;
    item.categoryId = dto.categoryId ? dto.categoryId : item.categoryId;
    await item.save();
    return item;
  }
}
