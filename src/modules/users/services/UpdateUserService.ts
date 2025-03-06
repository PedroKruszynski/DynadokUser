import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRedisBaseRepository from '@shared/infra/redis/entities';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IEntitieUser from '../infra/mongodb/entities/User';

@injectable()
class UpdateByUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RedisUsersRepository')
    private usersRedisRepository: IRedisBaseRepository,
  ) {
    // Do Nothing
  }

  public async execute({
    id, email, name, phone,
  }: IUpdateUserDTO): Promise<IEntitieUser | undefined> {
    if (email) {
      const checkUserExist = await this.usersRepository.findByEmail(email);
      if (checkUserExist) {
        throw new AppError('User with new email already exist');
      }
    }

    const user = await this.usersRepository.update({
      id,
      email,
      name,
      phone,
    });

    if (user) {
      await this.usersRedisRepository.save(id, JSON.stringify(user));
    }

    return user;
  }
}

export default UpdateByUserService;
