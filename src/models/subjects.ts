import { SubjectType } from '@micro/common/dist/src';
import { Subjects }    from '@micro/common/src/types/authorization';
import { actionTypes } from 'src/models/actionTypes';

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
