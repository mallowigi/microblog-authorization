import { ActionType }         from 'src/models/actionTypes';
import { ISubject, subjects } from 'src/models/subjects';

export enum RoleType {
  Admin = 'admin',
  User = 'user',
}

interface IRoleType {
  type: RoleType;
  permissions: IPermission[];
}

interface RoleTypes {
  [index: string]: IRoleType;
}

interface IPermission {
  subject: ISubject;
  actions: ActionType[];
}

export const roleTypes: RoleTypes = {
  admin: {
    type:        RoleType.Admin,
    permissions: [
      {
        subject: subjects.all,
        actions: subjects.all.actions,
      },
    ],
  },
  user:  {
    type:        RoleType.User,
    permissions: [
      {
        subject: subjects.articles,
        actions: subjects.articles.actions,
      },
      {
        subject: subjects.comments,
        actions: subjects.comments.actions,
      },
      {
        subject: subjects.users,
        actions: subjects.users.actions,
      },
    ],
  },
};
