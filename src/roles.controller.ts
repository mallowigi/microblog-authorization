import { RoleDocument }               from '@mallowigi/authorization/src/models/role';
import { RolesService }               from '@mallowigi/authorization/src/roles.service';
import {
  CanOnInstanceRequest,
  CanOnInstanceResponse,
  CanRequest,
  CanResponse,
  CreateRoleRequest,
  CreateRoleResponse,
  GetRolesRequest,
  GetRolesResponse,
}                                     from '@mallowigi/common';
import { Controller }                 from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';

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
  async getRoles(req: GetRolesRequest): Promise<GetRolesResponse<RoleDocument>> {
    return await this.rolesService.getRoles(req);
  }

  @GrpcMethod('RolesService')
  async createRole(req: CreateRoleRequest): Promise<CreateRoleResponse<RoleDocument>> {
    return await this.rolesService.createRole(req);
  }

  @MessagePattern({ cmd: 'createRole' })
  async asyncCreateRole(req: CreateRoleRequest) {
    return await this.rolesService.createRole(req);
  }
}
