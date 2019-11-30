import { Body, Controller, Param } from '@nestjs/common';
import { GrpcMethod }              from '@nestjs/microservices';
import { RolesService }            from 'src/roles.service';
import { CreateRole }              from 'src/schemas/roles';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @GrpcMethod('RolesService')
  async getRoles(@Param('id') id: string) {
    return await this.rolesService.getRoles({ userId: id });
  }

  @GrpcMethod('RolesService')
  async createRole(@Body() req: CreateRole) {
    return await this.rolesService.createRole(req);
  }
}
