import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    return user;
  }
}

export default CreateUserService;
