import { clientsProviders } from '@mallowigi/authorization/src/clients.provider';
import { RolesController }  from '@mallowigi/authorization/src/roles.controller';
import { RolesService }     from '@mallowigi/authorization/src/roles.service';
import { Module }           from '@nestjs/common';

@Module({
  imports:     [],
  controllers: [RolesController],
  providers:   [...clientsProviders, RolesService],
})
export class AppModule {}
