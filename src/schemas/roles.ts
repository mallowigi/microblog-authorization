import { IsString } from 'class-validator';
import { RoleType } from 'src/models/roleTypes';

export interface Roles {
  userId: string;
}

export class CreateRole {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly type: RoleType;
}
