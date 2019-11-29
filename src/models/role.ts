import { connect, Model }                             from 'mongoose';
import * as mongoosePaginate                          from 'mongoose-paginate';
import { RoleType }                                   from 'src/models/roleType';
import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/authorization`, { useNewUrlParser: true });

const RoleSchema = createSchema({
  userId: {
    type: Type.string({ required: true }),
  },
  type:   {
    type: Type.string({
      required: true,
      enum:     Object.values(RoleType),
    }),
  },
});

RoleSchema.plugin(mongoosePaginate);

export type IRole = ExtractDoc<typeof RoleSchema>;
export const Role: Model<IRole> = typedModel('Role', RoleSchema);

export async function newUserRole(userId): IRole {
  return new Role({});
}

export async function newAdminRole(userId): IRole {
  return new Role({});
}
