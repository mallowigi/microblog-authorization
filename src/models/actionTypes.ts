import { ActionType }  from '@micro/common/dist/src';
import { ActionTypes } from '@micro/common/src/types/authorization';

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
