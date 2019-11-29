import { logger }              from '@micro/common/dist/src';
import { Injectable }          from '@nestjs/common';
import { IRole, Role }         from 'src/models/role';
import { RoleType, roleTypes } from 'src/models/roleTypes';
import { CreateRole, Roles }   from 'src/schemas/roles';

@Injectable()
export class RolesService {
  public async getRoles({ userId }: Roles): Promise<IRole[]> {
    try {
      const roles = await Role.find({ userId });
      logger.info({
        message: 'fetched roles',
        payload: { userId },
      });
      return roles;
    }
    catch (e) {
      logger.error({
        message: 'can not find roles',
        payload: { userId },
      });
    }
  }

  public async createRole(req: CreateRole) {
    const { userId, type } = req;
    // Check if exists a role
    const existingRole = await Role.findOne({ userId, type });

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
      return newRole;
    }
    else if (type === RoleType.Admin) {
      const newRole = await this.newAdminRole(userId);
      logger.info({
        message: 'admin role created',
        payload: { userId },
      });
      return newRole;
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

  async newUserRole(userId: string): Promise<IRole> {
    return await Role.create({
      userId,
      type:        roleTypes.user.type,
      permissions: roleTypes.user.permissions,
    });
  }

  async newAdminRole(userId: string): Promise<IRole> {
    return await Role.create({
      userId,
      type:        roleTypes.admin.type,
      permissions: roleTypes.admin.permissions,
    });
  }
}
