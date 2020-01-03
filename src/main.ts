import { ValidationPipe } from '@nestjs/common';
import { Transport }      from '@nestjs/common/enums/transport.enum';
import { NestFactory }    from '@nestjs/core';
import { join }           from 'path';
import { AppModule }      from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options:   {
      package:   'service',
      url:       '0.0.0.0:50050',
      protoPath: join(__dirname, '../../common/proto/authorization/service.proto'),
    },
  });
  app.connectMicroservice({
    transport: Transport.NATS,
    options:   {
      url:   process.env.NATS_URL || 'nats://localhost:8222',
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
  app.startAllMicroservices(() => console.log('Running authorization microservice'));
  await app.listen(3000);
}

bootstrap();
