import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IEntitieUser from '../infra/mongodb/entities/User';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IEntitieUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default FindAllUsersService;