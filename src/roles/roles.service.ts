import { logger }         from '@micro/common/dist/src';
import { Injectable }     from '@nestjs/common';
import { Role }           from 'src/models/role';
import { GetRolesSchema } from 'src/schemas/getRoles.schema';

@Injectable()
export class RolesService {
  public async getRoles({ userId }: GetRolesSchema) {
    const roles = await Role.find({ userId });
    logger.info({
      message: 'fetched roles',
      payload: { userId },
    });
    return { roles };
  }
}
