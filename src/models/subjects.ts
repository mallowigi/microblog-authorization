import { ActionType, actionTypes } from 'src/models/actionTypes';

export enum SubjectType {
  All = 'all',
  Articles = 'articles',
  Comments = 'comments',
  Users = 'users',
}

export interface ISubject {
  type: SubjectType;
  actions?: ActionType[];
  conditionFieldName?: string;
}

interface ISubjects {
  [index: string]: ISubject;
}

export const subjects: ISubjects = {
  all:      {
    type:               SubjectType.All,
    conditionFieldName: '',
    actions:            [actionTypes.manage.type],
  },
  articles: {
    type:               SubjectType.Articles,
    conditionFieldName: 'authorId',
    actions:            [actionTypes.manage.type],
  },
  comments: {
    type:               SubjectType.Comments,
    conditionFieldName: 'authorId',
    actions:            [actionTypes.manage.type],
  },
  users:    {
    type:               SubjectType.Users,
    conditionFieldName: 'id',
    actions:            [actionTypes.manage.type],
  },
};
