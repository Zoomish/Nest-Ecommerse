import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Item } from 'src/items/items.model';
import { Category } from './category.model';
import { FilesModule } from 'src/files/files.module';

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
