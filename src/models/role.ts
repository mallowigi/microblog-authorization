import { connect, Model }                                           from 'mongoose';
import * as mongoosePaginate                                        from 'mongoose-paginate';
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose';
import { SubjectType, ActionType, RoleType } from '@mallowigi/common';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/authorization`, { useNewUrlParser: true });

const SubjectSchema = createSchema({
  type:               Type.number({
    required: true,
    enum:     Object.values(SubjectType),
  }),
  conditionFieldName: Type.string(),
}, { _id: false });

const PermissionSchema = createSchema({
  actions: Type.array().of(
    Type.number({
      required: true,
      enum:     Object.values(ActionType),
    }),
  ),
  subject: Type.schema({ required: true }).of(SubjectSchema),
}, { _id: false });

const RoleSchema = createSchema({
  userId:      Type.string({ required: true }),
  type:        Type.number({
    required: true,
    enum:     Object.values(RoleType),
  }),
  permissions: Type.array({ required: true }).of(PermissionSchema),
});

RoleSchema.plugin(mongoosePaginate);

// Exports
export type RoleDocument = ExtractDoc<typeof RoleSchema>;
export type RoleProps = ExtractProps<typeof RoleSchema>;
export const RoleModel: Model<RoleDocument> = typedModel('Role', RoleSchema);
