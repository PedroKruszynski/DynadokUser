import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRedisBaseRepository from '@shared/infra/redis/entities';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RedisUsersRepository')
    private usersRedisRepository: IRedisBaseRepository,
  ) {
    // Do nothing
  }

  public async execute({ email, name, phone }: ICreateUserDTO): Promise<ICreateUserDTO> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('User already exist');
    }

    const user = await this.usersRepository.create({
      email,
      name,
      phone,
    });

    if (user) {
      await this.usersRedisRepository.save(String(user.id), JSON.stringify(user));
    }

    return user;
  }
}

export default CreateUserService;
