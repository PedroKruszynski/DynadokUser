import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IEntitieUser from '../infra/mongodb/entities/User';
import IFindById from '../dtos/IFindById';

@injectable()
class FindByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IFindById): Promise<IEntitieUser | undefined> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export default FindByIdService;