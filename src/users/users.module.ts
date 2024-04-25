import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './model/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/model/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoles } from 'src/roles/model/user-roles.model';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
