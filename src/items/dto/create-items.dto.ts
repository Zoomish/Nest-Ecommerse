import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsNumber()
  readonly categoryId: number;
  readonly description: string;
  readonly price: number;
}
