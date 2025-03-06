import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRedisBaseRepository from '@shared/infra/redis/entities';
import IKafkaProducerBaseService from '@shared/infra/kafka/entities';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RedisUsersRepository')
    private usersRedisRepository: IRedisBaseRepository,
    @inject('KafkaUsers')
    private kafkaProducer: IKafkaProducerBaseService,
  ) {
    // Do nothing
  }

  public async execute({ email, name, phone }: ICreateUserDTO): Promise<ICreateUserDTO | AppError> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      return new AppError('User already exist');
    }

    const user = await this.usersRepository.create({
      email,
      name,
      phone,
    });

    if (user) {
      const promises = [
        this.kafkaProducer.sendMessage('user-created', user),
        this.usersRedisRepository.save(String(user.id), JSON.stringify(user)),
      ]

      await Promise.all(promises);
    }

    return user;
  }
}

export default CreateUserService;
