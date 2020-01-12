import { RolesController }  from '@mallowigi/authorization/src/roles.controller';
import { RolesService }     from '@mallowigi/authorization/src/roles.service';
import { clientsProviders } from '@mallowigi/common';
import { Module }           from '@nestjs/common';
import { AbilityService }   from './ability/ability.service';

@Module({
  imports:     [],
  controllers: [RolesController],
  providers:   [...clientsProviders, RolesService, AbilityService],
})
export class AppModule {}
