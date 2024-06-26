import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Item } from 'src/modules/items/model/items.model';

interface CategoryCreationAttrs {
  title: string;
  image: string;
}
@Table({ tableName: 'category' })
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
  title: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @HasMany(() => Item)
  items: Item[];
}
