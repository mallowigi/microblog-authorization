import { ActionType, ActionTypes } from '@mallowigi/common';

export const actionTypes: ActionTypes = {
  manage: {
    name: 'manage',
    type: ActionType.Manage,
  },
  read:   {
    name: 'read',
    type: ActionType.Read,
  },
  create: {
    name: 'create',
    type: ActionType.Create,
  },
  update: {
    name: 'update',
    type: ActionType.Update,
  },
  delete: {
    name: 'delete',
    type: ActionType.Delete,
  },
};
