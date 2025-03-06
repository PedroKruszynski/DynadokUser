import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ValidateCreateUser from '../../validation/ValidateCreateUser';

import CreateUserService from '@modules/users/services/CreateUserService';
import { ZodError } from 'zod';

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
    console.log(user)
    return response.json(user);
  }
}