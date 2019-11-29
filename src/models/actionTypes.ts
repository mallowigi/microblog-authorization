export enum ActionType {
  Manage = 'manage',
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export const actionTypes = {
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

export interface IAction {
  type: ActionType;
}
