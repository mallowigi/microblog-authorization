import { Controller, Get, Param } from '@nestjs/common';
import { RolesService }           from 'src/roles/roles.service';

@Controller('/roles')
export class AppController {
  constructor(private readonly rolesService: RolesService) {
  }

  @Get(':id')
  async getRoles(@Param('id') id: string) {
    return await this.rolesService.getRoles({ userId: id });
  }
}
