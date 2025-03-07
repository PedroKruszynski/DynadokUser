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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

export default class UsersController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               name:
   *                 type: string
   *               phone:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   pattern: "^[a-fA-F0-9]{24}$"
   *                 name:
   *                   type: string
   *                 phone:
   *                   type: string
   *                 email:
   *                   type: string
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *                 updatedAt:
   *                   type: string
   *                   format: date-time
   *       400:
   *         description: Bad request, invalid input or validation error
   *       500:
   *         description: Internal server error
   */
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
    return response.status(201).json(user);
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Find all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Find users successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                    id:
   *                      type: string
   *                      pattern: "^[a-fA-F0-9]{24}$"
   *                    name:
   *                      type: string
   *                    phone:
   *                      type: string
   *                    email:
   *                      type: string
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *       500:
   *         description: Internal server error
   */
  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllUsers = container.resolve(FindAllUsersService);

    const users = await findAllUsers.execute();

    return response.json(users);
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Find a user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the user to be find
   *         schema:
   *           type: string
   *           pattern: "^[a-fA-F0-9]{24}$"
   *     responses:
   *       200:
   *         description: Find one user successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   pattern: "^[a-fA-F0-9]{24}$"
   *                 name:
   *                   type: string
   *                 phone:
   *                   type: string
   *                 email:
   *                   type: string
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *                 updatedAt:
   *                   type: string
   *                   format: date-time
   *       400:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Create a new user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the user to be updated
   *         schema:
   *           type: integer
   *           format: int64
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 nullable: true
   *                 type: string
   *               name:
   *                 nullable: true
   *                 type: string
   *               phone:
   *                 nullable: true
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   pattern: "^[a-fA-F0-9]{24}$"
   *                 name:
   *                   type: string
   *                 phone:
   *                   type: string
   *                 email:
   *                   type: string
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *                 updatedAt:
   *                   type: string
   *                   format: date-time
   *       400:
   *         description: Bad request, invalid input or validation error
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
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
      throw new AppError('User not found', 404);
    }

    return response.json(user);
  }
}
