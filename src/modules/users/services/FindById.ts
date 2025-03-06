import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IEntitieUser from '../infra/mongodb/entities/User';
import IFindById from '../dtos/IFindById';

@injectable()
class FindByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    // Do nothing
  }

  public async execute({ id }: IFindById): Promise<IEntitieUser | undefined> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export default FindByIdService;
