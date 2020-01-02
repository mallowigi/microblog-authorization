import { Module }          from '@nestjs/common';
import { RolesController } from 'src/roles.controller';
import { RolesService }    from 'src/roles.service';

@Module({
  imports:     [],
  controllers: [RolesController],
  providers:   [RolesService],
})
export class AppModule {}
