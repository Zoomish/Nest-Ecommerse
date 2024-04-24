import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 1, description: 'Id категории' })
  @IsString()
  readonly categoryId: number;

  @ApiProperty({
    example: 'Очень вкусное вино',
    description: 'Описание товара',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: 150, description: 'Цена' })
  @IsString()
  readonly price: number;

  @ApiProperty({ example: 150, description: 'Старая Цена' })
  @IsString()
  readonly oldPrice?: number;
}
