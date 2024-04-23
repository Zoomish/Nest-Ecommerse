import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get('/:value')
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
