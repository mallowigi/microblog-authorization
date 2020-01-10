import { actionTypes }                         from '@mallowigi/authorization/src/models/actionTypes';
import { subjectNames, Subjects, SubjectType } from '@mallowigi/common';

export const subjects: Subjects = {
  all:      {
    name:               subjectNames.ALL,
    type:               SubjectType.All,
    conditionFieldName: '',
    actions:            [actionTypes.manage.type],
  },
  articles: {
    name:               subjectNames.ARTICLES,
    type:               SubjectType.Articles,
    conditionFieldName: 'authorId',
    actions:            [actionTypes.manage.type],
  },
  comments: {
    name:               subjectNames.COMMENTS,
    type:               SubjectType.Comments,
    conditionFieldName: 'authorId',
    actions:            [actionTypes.manage.type],
  },
  users:    {
    name:               subjectNames.USERS,
    type:               SubjectType.Users,
    conditionFieldName: 'id',
    actions:            [actionTypes.manage.type],
  },
};
