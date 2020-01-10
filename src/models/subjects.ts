import { actionTypes }                         from '@mallowigi/authorization/src/models/actionTypes';
import { subjectNames, Subjects, SubjectType } from '@mallowigi/common';

export const subjects: Subjects = {
  all:      {
    name:               subjectNames.all,
    type:               SubjectType.All,
    conditionFieldName: '',
    actions:            [actionTypes.manage.type],
  },
  articles: {
    name:               subjectNames.articles,
    type:               SubjectType.Articles,
    conditionFieldName: 'authorId',
    actions:            [actionTypes.manage.type],
  },
  comments: {
    name:               subjectNames.comments,
    type:               SubjectType.Comments,
    conditionFieldName: 'authorId',
    actions:            [actionTypes.manage.type],
  },
  users:    {
    name:               subjectNames.users,
    type:               SubjectType.Users,
    conditionFieldName: 'id',
    actions:            [actionTypes.manage.type],
  },
};
