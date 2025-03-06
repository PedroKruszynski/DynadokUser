import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IEntitieUser from '../infra/mongodb/entities/User';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    // Do nothing
  }

  public async execute(): Promise<IEntitieUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default FindAllUsersService;
