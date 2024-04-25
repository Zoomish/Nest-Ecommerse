import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Саке', description: 'Заголовок категории' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;
}
