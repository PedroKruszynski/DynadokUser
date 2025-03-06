import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/mongodb/repositories/UsersRepository';

import RedisUsersRepository from '@modules/users/infra/redis';
import IRedisBaseRepository from '@shared/infra/redis/entities';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRedisBaseRepository>(
  'RedisUsersRepository',
  RedisUsersRepository,
);
