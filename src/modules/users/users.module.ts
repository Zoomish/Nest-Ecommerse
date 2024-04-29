import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './model/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/modules/roles/model/roles.model';
import { RolesModule } from 'src/modules/roles/roles.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
