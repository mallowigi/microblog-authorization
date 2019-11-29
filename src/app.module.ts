import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule {}
