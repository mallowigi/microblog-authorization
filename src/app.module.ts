import { Module }          from '@nestjs/common';
import { RolesController } from 'src/roles.controller';
import { RolesService }    from 'src/roles.service';
import { AppService }      from './app.service';

@Module({
  imports:     [],
  controllers: [RolesController],
  providers:   [AppService, RolesService],
})
export class AppModule {}
