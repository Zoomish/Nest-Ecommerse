import { forwardRef, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './model/items.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/modules/files/files.module';
import { Category } from 'src/modules/category/model/category.model';
import { CategoriesModule } from 'src/modules/category/category.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [
    SequelizeModule.forFeature([Item, Category]),
    FilesModule,
    CategoriesModule,
    forwardRef(() => AuthModule),
  ],
})
export class ItemsModule {}
