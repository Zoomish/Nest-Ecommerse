import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './model/roles.model';
import { User } from '../users/model/users.model';

@Module({
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User])],
  exports: [RolesService],
})
export class RolesModule {}
