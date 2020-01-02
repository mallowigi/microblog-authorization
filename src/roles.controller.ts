import { CanOnInstanceRequest, CanOnInstanceResponse, CanRequest, CanResponse } from '@micro/common/types/authorization';
import { Body, Controller, Param }                                              from '@nestjs/common';
import { GrpcMethod }                                                           from '@nestjs/microservices';
import { RolesService }                                                         from 'src/roles.service';
import { CreateRole }                                                           from 'src/schemas/roles';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @GrpcMethod('RolesService')
  async can(request: CanRequest): Promise<CanResponse> {
    return await this.rolesService.can(request);
  }

  @GrpcMethod('RolesService')
  async canOnInstance(request: CanOnInstanceRequest): Promise<CanOnInstanceResponse> {
    return await this.rolesService.canOnInstance(request);
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
