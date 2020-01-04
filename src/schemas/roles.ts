import { RoleType } from '@micro/common/dist/src';
import { IsString } from 'class-validator';

export interface Roles {
  userId: string;
}

export class CreateRole {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly type: RoleType;
}
