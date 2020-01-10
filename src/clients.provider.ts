import { Transport } from '@nestjs/microservices';
import { join }      from 'path';

interface Client {
  transport: Transport;
  options: any;
}

export const natsClient: Client = {
  transport: Transport.NATS,
  options:   {
    url:   process.env.NATS_URL || 'nats://localhost:4222',
    queue: 'authorization',
    name:  'authorization',
  },
};

export const authorizationGrpcClient: Client = {
  transport: Transport.GRPC,
  options:   {
    url:       '0.0.0.0:50052',
    package:   'service',
    protoPath: join(__dirname, '../../common/proto/authorization/service.proto'),
  },
};

export const clientsProviders = [
  {
    provide:  'NATS_CLIENT',
    useValue: natsClient,
  },
  {
    provide:  'AUTHORIZATION_GRPC_CLIENT',
    useValue: authorizationGrpcClient,
  },
];
