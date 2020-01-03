import { authorizationGrpcClientOptions } from '@micro/common/dist/src';
import { ValidationPipe }                 from '@nestjs/common';
import { NestFactory }                    from '@nestjs/core';
import { Transport }                      from '@nestjs/microservices';
import { AppModule }                      from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(authorizationGrpcClientOptions);
  app.connectMicroservice({
    transport: Transport.NATS,
    options:   {
      url:   process.env.NATS_URL || 'nats://localhost:4222',
      queue: 'authorization',
      name:  'authorization',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform:            true,
      forbidNonWhitelisted: true,
    }),
  );
  // tslint:disable-next-line:no-console
  await app.startAllMicroservicesAsync();
  await app.listen(3002);
}

bootstrap();
