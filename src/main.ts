import { AppModule }                               from '@mallowigi/authorization/src/app.module';
import { authNatsClient, authorizationGrpcClient } from '@mallowigi/common';
import { ValidationPipe }                          from '@nestjs/common';
import { NestFactory }                             from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(authorizationGrpcClient);
  app.connectMicroservice(authNatsClient);
  app.useGlobalPipes(
    new ValidationPipe({
      transform:            true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.startAllMicroservicesAsync();
  await app.listen(3002);
}

bootstrap();
