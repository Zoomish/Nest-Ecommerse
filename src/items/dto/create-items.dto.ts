import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsString()
  readonly categoryId: number;

  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: 150, description: 'Цена' })
  @IsString()
  readonly price: number;

  @ApiProperty({ example: 150, description: 'Цена' })
  @IsString()
  readonly oldPrice: number;
}
