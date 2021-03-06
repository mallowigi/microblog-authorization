import { subjects } from 'src/models/subjects';
import { RoleType, IRoles } from '@mallowigi/common';

export const roleTypes: IRoles = {
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
