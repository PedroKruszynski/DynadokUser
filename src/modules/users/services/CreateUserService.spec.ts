import 'reflect-metadata'

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeKafkaUsers from '../infra/kafka/fakes/FakeKafkaUsers';
import FakeRedisUsersRepository from '../infra/redis/fakes/FakeRedisUsersRepository';

describe('CreateUser', () => {
  let fakeUsersRepository
  let fakeRedisUsersRepository
  let fakeKafkaUsers
  let createUser: CreateUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository('users');
    fakeRedisUsersRepository = new FakeRedisUsersRepository()
    fakeKafkaUsers = new FakeKafkaUsers();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeRedisUsersRepository,
      fakeKafkaUsers,
    );
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'jhon.doe@example.com',
      name: 'Jhon Doe',
      phone: '16999999999',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUser.execute({
      email: 'jhon.doe@example.com',
      name: 'Jhon Doe',
      phone: '16999999999',
    });

    expect(
      createUser.execute({
        email: 'jhon.doe@example.com',
        name: 'Jhon Doe',
        phone: '16999999999',
      }),
    ).resolves.toBeInstanceOf(AppError);
  });
});
