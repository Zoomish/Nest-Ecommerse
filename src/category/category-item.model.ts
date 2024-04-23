import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.model';
import { Item } from 'src/items/items.model';

@Table({ tableName: 'Category-Item', timestamps: false })
export class CategoryItems extends Model<CategoryItems> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @ForeignKey(() => Item)
  @Column({ type: DataType.INTEGER })
  item: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;
}
