import { Ability }                                                    from '@casl/ability';
import { IRole, logger, subjectNames, SubjectNames, usersNatsClient } from '@mallowigi/common';
import { Injectable }                                                 from '@nestjs/common';
import { Client, ClientProxy }                                        from '@nestjs/microservices';

interface CanBySubjectParams {
  roles: IRole[];
  userId: string;
  action: string;
  subject: SubjectNames;
  subjectId?: string;
}

const TYPE_FIELD = Symbol('subject');

function subjectName(subject) {
  return !subject || typeof subject === 'string' ? subject : subject[TYPE_FIELD];
}

function subjectt(name, object) {
  return { [TYPE_FIELD]: name, ...object };
}

@Injectable()
export class AbilityService {
  @Client(usersNatsClient)
  usersClient: ClientProxy;

  async onModuleInit() {
    await this.usersClient.connect();
  }

  canBySubject({ roles, userId, action, subject }: CanBySubjectParams) {
    const permissions = this.getPermissionsFromRoles(roles);
    const ability = new Ability(permissions, { subjectName });
    const hasAbility = ability.can(action, subject);

    if (!hasAbility) {
      logger.warn({
        message: 'wrong permissions',
        payload: { userId, action, subject },
      });
    }
    return hasAbility;
  }

  async canBySubjectInstance({ roles, userId, action, subject, subjectId }: CanBySubjectParams) {
    const permissions = this.getPermissionsFromRoles(roles);
    const ability = new Ability(permissions, { subjectName });

    try {
      const subjectInstance = await this.getSubjectInstance(subject, subjectId);
      if (!subjectInstance) {
        return false;
      }
      const hasAbility = ability.can(action, subjectt(subject, subjectInstance));
      if (!hasAbility) {
        logger.warn({
          message: 'wrong permissions',
          payload: { userId, action, subject, subjectId },
        });
      }
      return hasAbility;
    }
    catch (error) {
      logger.error({
        error,
        message: 'can not find subject',
        payload: { userId, action, subject, subjectId },
      });
    }
  }

  private getPermissionsFromRoles(roles: IRole[]) {
    const permissions = [];
    roles.forEach(role => {
      role.permissions.forEach(permission => {
        const reducedPermission = {
          subject:    permission.subject.name,
          actions:    permission.actions,
          conditions: {},
        };
        // Add the condition if it exists
        const conditionFieldName = permission.subject.conditionFieldName;
        if (conditionFieldName) {
          reducedPermission.conditions[conditionFieldName] = role.userId;
        }

        permissions.push(reducedPermission);
      });
    });
    return permissions;
  }

  private async getSubjectInstance(subject: SubjectNames, subjectId: string) {
    switch (subject) {
      case subjectNames.users:
        return this.usersClient.send({ cmd: 'getUser' }, { id: subjectId }).toPromise();
      default:
        return null;
    }
  }
}
