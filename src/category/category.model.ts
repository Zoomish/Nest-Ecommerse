import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/items/items.model';
import { Role } from 'src/roles/roles.model';
import { CategoryRoles } from 'src/roles/user-roles.model';

interface CategoryCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентефикатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'test@gmail.com', description: 'Уникальная почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => CategoryRoles)
  roles: Role[];

  @HasMany(() => Item)
  items: Item[];
}
