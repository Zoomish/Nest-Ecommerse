import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/model/users.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/model/roles.model';
import { UserRoles } from './modules/roles/model/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { ItemsModule } from './modules/items/items.module';
import { Item } from './modules/items/model/items.model';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CategoriesModule } from './modules/category/category.module';
import { Category } from './modules/category/model/category.model';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Item, Category],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    CategoriesModule,
    RolesModule,
    AuthModule,
    ItemsModule,
    FilesModule,
  ],
})
export class AppModule {}
