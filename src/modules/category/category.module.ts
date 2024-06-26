import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { User } from 'src/modules/users/model/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/modules/roles/model/roles.model';
import { RolesModule } from 'src/modules/roles/roles.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Item } from 'src/modules/items/model/items.model';
import { Category } from './model/category.model';
import { FilesModule } from 'src/modules/files/files.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([User, Role, Item, Category]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
