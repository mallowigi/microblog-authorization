import { actionTypes } from 'src/models/actionTypes';
import { Subjects, SubjectType } from '@mallowigi/common';

export const subjects: Subjects = {
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
