import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { User } from 'src/users/model/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/model/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Item } from 'src/items/model/items.model';
import { Category } from './model/category.model';
import { FilesModule } from 'src/files/files.module';
import { UserRoles } from 'src/roles/model/user-roles.model';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([User, Role, Item, Category, UserRoles]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
