import { Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService }                 from 'src/roles/roles.service';
import { CreateRole }                   from 'src/schemas/roles';

@Controller('/roles')
export class AppController {
  constructor(private readonly rolesService: RolesService) {
  }

  @Get(':id')
  async getRoles(@Param('id') id: string) {
    return await this.rolesService.getRoles({ userId: id });
  }

  @Post()
  async createRole(req: CreateRole) {
    return await this.rolesService.createRole(req);
  }
}
