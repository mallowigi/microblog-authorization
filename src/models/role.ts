import { connect, Model }                                           from 'mongoose';
import * as mongoosePaginate                                        from 'mongoose-paginate';
import { ActionType, RoleType, Scope }                              from 'src/models/enums';
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/authorization`, { useNewUrlParser: true });

const SubjectSchema = createSchema({
  name:               Type.string({ required: true }),
  conditionFieldName: Type.string({ required: false }),
}, { _id: false });

const PermissionSchema = createSchema({
  actions: Type.array().of(
    Type.string({ required: true, enum: Object.values(ActionType) }),
  ),
  subject: Type.array({ required: true }).of(SubjectSchema),
}, { _id: false });

const RoleSchema = createSchema({
  userId:      Type.string({ required: true }),
  type:        Type.string({
    required: true,
    enum:     Object.values(RoleType),
  }),
  permissions: Type.array({ required: true }).of(PermissionSchema),
});

RoleSchema.plugin(mongoosePaginate);

// Exports
export type IRole = ExtractDoc<typeof RoleSchema>;
export type RoleProps = ExtractProps<typeof RoleSchema>;
export const Role: Model<IRole> = typedModel('Role', RoleSchema);

export async function newUserRole(userId: string): Promise<IRole> {
  return Role.create({
    userId,
    type:        RoleType.User,
    permissions: getUserPermissions(),
  } as unknown as RoleProps);
}

export async function newAdminRole(userId: string): Promise<IRole> {
  return Role.create({
    userId,
    type:        RoleType.Admin,
    permissions: getAdminPermissions(),
  } as unknown as RoleProps);
}

function getAdminPermissions() {
  return [
    {
      subject: Scope.All,
      actions: [ActionType.Manage],
    },
  ];
}

function getUserPermissions() {
  return [
    {
      subject: Scope.Articles,
      actions: [ActionType.Manage],
    },
    {
      subject: Scope.Comments,
      actions: [ActionType.Manage],
    },
    {
      subject: Scope.Users,
      actions: [ActionType.Manage],
    },
  ];
}
