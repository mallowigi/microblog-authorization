import { IsString } from 'class-validator';
import { RoleType } from 'src/models/enums';

export interface Roles {
  userId: string;
}

export class CreateRole {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly type: RoleType;
}
