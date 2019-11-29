import { Module }        from '@nestjs/common';
import { RolesService }  from 'src/roles.service';
import { AppController } from './app.controller';
import { AppService }    from './app.service';

@Module({
  imports:     [],
  controllers: [AppController],
  providers:   [AppService, RolesService],
})
export class AppModule {}
