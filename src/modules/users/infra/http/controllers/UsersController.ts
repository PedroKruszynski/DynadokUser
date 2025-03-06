import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import FindAllUsersService from '@modules/users/services/FindAllUsersService';
import FindByIdService from '@modules/users/services/FindById';
import UpdateByUserService from '@modules/users/services/UpdateUserService';
import ValidateFindById from '../../validation/ValidateFindById';
import ValidateUpdateUser from '../../validation/ValidateUpdateUser';
import ValidateCreateUser from '../../validation/ValidateCreateUser';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userData = ValidateCreateUser.safeParse(request.body);

    if (!userData.success) {
      throw new AppError(userData.error.issues, 400);
    }

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(userData.data);
    return response.json(user);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllUsers = container.resolve(FindAllUsersService);

    const users = await findAllUsers.execute();

    return response.json(users);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userData = ValidateFindById.safeParse(request.params);

    if (!userData.success) {
      throw new AppError(userData.error.issues, 400);
    }

    const findById = container.resolve(FindByIdService);

    const user = await findById.execute(userData.data);

    if (!user) {
      throw new AppError('User not found', 400);
    }

    return response.json(user);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userData = ValidateUpdateUser.safeParse({ ...request.params, ...request.body });

    if (!userData.success) {
      throw new AppError(userData.error.issues, 400);
    }

    const updateUser = container.resolve(UpdateByUserService);

    const user = await updateUser.execute(userData.data);

    if (!user) {
      throw new AppError('User not found', 400);
    }

    return response.json(user);
  }
}
