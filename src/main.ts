import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import { Transport }      from '@nestjs/microservices';
import { join }           from 'path';
import { AppModule }      from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options:   {
      url:       '0.0.0.0:50052',
      package:   'service',
      protoPath: join(__dirname, '../../common/proto/authorization/service.proto'),
    },
  });
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
