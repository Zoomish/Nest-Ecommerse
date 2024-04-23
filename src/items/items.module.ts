import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './items.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { Category } from 'src/category/category.model';
import { CategoriesModule } from 'src/category/category.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [
    SequelizeModule.forFeature([Item, Category]),
    FilesModule,
    CategoriesModule,
  ],
})
export class ItemsModule {}
