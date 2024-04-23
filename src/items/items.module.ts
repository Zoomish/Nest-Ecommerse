import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './items.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [SequelizeModule.forFeature([User, Item]), FilesModule],
})
export class ItemsModule {}
