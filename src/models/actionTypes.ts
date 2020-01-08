import { ActionTypes, ActionType } from '@mallowigi/common';

export const actionTypes: ActionTypes = {
  manage: {
    type: ActionType.Manage,
  },
  read:   {
    type: ActionType.Read,
  },
  create: {
    type: ActionType.Create,
  },
  update: {
    type: ActionType.Update,
  },
  delete: {
    type: ActionType.Delete,
  },
};
