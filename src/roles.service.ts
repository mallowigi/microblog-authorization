import { AbilityService }          from '@mallowigi/authorization/src/ability/ability.service';
import { RoleDocument, RoleModel } from '@mallowigi/authorization/src/models/role';
import { roleTypes }               from '@mallowigi/authorization/src/models/roleTypes';
import {
  CanOnInstanceRequest,
  CanOnInstanceResponse,
  CanRequest,
  CanResponse,
  CreateRoleRequest,
  GetRolesRequest,
  GetRolesResponse,
  IRolesService,
  logger,
  RoleType,
}                                  from '@mallowigi/common';
import { Injectable }              from '@nestjs/common';

@Injectable()
export class RolesService implements IRolesService<RoleDocument> {
  constructor(private readonly abilityService: AbilityService) {
  }

  public async can(request: CanRequest): Promise<CanResponse> {
    try {
      const { userId } = request;
      // Get all roles related with the user
      const roles = await RoleModel.find({ userId });
      return { yes: this.abilityService.canBySubject({ roles, ...request }) };
    }
    catch (error) {
      logger.error({
        message: 'permission error',
        payload: request,
        error,
      });
      return { yes: false };
    }
  }

  public async canOnInstance(request: CanOnInstanceRequest): Promise<CanOnInstanceResponse> {
    try {
      const { userId } = request;
      // Get all roles related with the user
      const roles = await RoleModel.find({ userId });
      return { yes: await this.abilityService.canBySubjectInstance({ roles, ...request }) };
    }
    catch (error) {
      logger.error({
        message: 'permission error',
        payload: request,
        error,
      });
      return { yes: false };
    }
  }

  public async getRoles(req: GetRolesRequest): Promise<GetRolesResponse<RoleDocument>> {
    const { userId } = req;
    try {
      const roles = await RoleModel.find({ userId });
      logger.info({
        message: 'fetched roles',
        payload: { userId },
      });
      return { roles };
    }
    catch (e) {
      logger.error({
        message: 'can not find roles',
        payload: { userId },
      });
    }
  }

  public async createRole(req: CreateRoleRequest) {
    const { userId, type } = req;
    // Check if exists a role
    const existingRole = await RoleModel.findOne({ userId, type });

    if (existingRole) {
      const message = 'role already exists';
      logger.error({
        message,
        paylaod: req,
      });
      throw Error(message);
    }

    if (type === RoleType.User) {
      const newRole = await this.newUserRole(userId);
      logger.info({
        message: 'user role created',
        payload: { userId },
      });
      return { role: newRole };
    }
    else if (type === RoleType.Admin) {
      const newRole = await this.newAdminRole(userId);
      logger.info({
        message: 'admin role created',
        payload: { userId },
      });
      return { role: newRole };
    }
    else {
      const message = 'Invalid role type';
      logger.error({
        message,
        payload: { userId, type },
      });
      throw Error(message);
    }
  }

  async newUserRole(userId: string): Promise<RoleDocument> {
    return await RoleModel.create({
      userId,
      type:        roleTypes.user.type,
      permissions: roleTypes.user.permissions,
    });
  }

  async newAdminRole(userId: string): Promise<RoleDocument> {
    return await RoleModel.create({
      userId,
      type:        roleTypes.admin.type,
      permissions: roleTypes.admin.permissions,
    });
  }

}
