import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-items.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private ItemRepository: typeof Item,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateItemDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const Item = await this.ItemRepository.create({ ...dto, image: fileName });
    return Item;
  }
}
