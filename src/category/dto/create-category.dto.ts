import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'От 4 до 16 символов' })
  readonly password: string;
}
