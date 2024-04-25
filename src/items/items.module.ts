import { forwardRef, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './model/items.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { Category } from 'src/category/model/category.model';
import { CategoriesModule } from 'src/category/category.module';
import { UserRoles } from 'src/roles/model/user-roles.model';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [
    SequelizeModule.forFeature([Item, Category, UserRoles]),
    FilesModule,
    CategoriesModule,
    forwardRef(() => AuthModule),
  ],
})
export class ItemsModule {}
