import { injectable, inject } from 'tsyringe';

import IRedisBaseRepository from '@shared/infra/redis/entities';
import IUsersRepository from '../repositories/IUsersRepository';
import IEntitieUser from '../infra/mongodb/entities/User';
import IFindById from '../dtos/IFindById';

@injectable()
class FindByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RedisUsersRepository')
    private usersRedisRepository: IRedisBaseRepository,
  ) {
    // Do nothing
  }

  public async execute({ id }: IFindById): Promise<IEntitieUser | undefined> {
    const userFindInRedis = await this.usersRedisRepository.recover(id);

    if (userFindInRedis) {
      return JSON.parse(userFindInRedis) as IEntitieUser;
    }

    const user = await this.usersRepository.findById(id);

    if (user) {
      await this.usersRedisRepository.save(id, JSON.stringify(user));
    }

    return user;
  }
}

export default FindByIdService;
