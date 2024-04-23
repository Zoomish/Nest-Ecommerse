import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './category';
import { CategoriesService } from './category.service';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Item } from 'src/items/items.model';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Item]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
