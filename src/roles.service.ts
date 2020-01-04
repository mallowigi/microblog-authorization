import { logger, RoleType }        from '@micro/common/dist/src';
import {
  CanOnInstanceRequest,
  CanOnInstanceResponse,
  CanRequest,
  CanResponse,
  CreateRoleRequest,
  IRolesService,
}                                  from '@micro/common/src/types/authorization';
import { Injectable }              from '@nestjs/common';
import { RoleDocument, RoleModel } from 'src/models/role';
import { roleTypes }               from 'src/models/roleTypes';

function canBySubject(param: { subject: string; roles: any; action: string; userId: string }) {
  return false;
}

async function canBySubjectInstance(param: { subject: string; roles: any; action: string; userId: string; subjectId: string }) {
  return undefined;
}

@Injectable()
export class RolesService implements IRolesService<RoleDocument> {
  public async can(request: CanRequest): Promise<CanResponse> {
    try {
      const { userId } = request;
      // Get all roles related with the user
      const roles = await RoleModel.find({ userId });
      return { yes: canBySubject({ roles, ...request }) };
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
      return { yes: await canBySubjectInstance({ roles, ...request }) };
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

  public async getRoles({ userId }) {
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
