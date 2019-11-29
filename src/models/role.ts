import { connect, model, Schema } from 'mongoose';
import * as mongoosePaginate      from 'mongoose-paginate';
import { RoleType }               from 'src/models/roleType';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/authorization`, { useNewUrlParser: true });

const RoleSchema = new Schema({
  userId: {
    type:     String,
    required: true,
  },
  type:   {
    type:     String,
    required: true,
    enum:     Object.values(RoleType),
  },
});

RoleSchema.plugin(mongoosePaginate);

export const Role = model('Role', RoleSchema);
