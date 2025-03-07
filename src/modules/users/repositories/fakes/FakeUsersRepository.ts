import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/mongodb/entities/User';
import BaseRepository from '@shared/infra/mongodb/repositories';
import { ObjectId } from 'mongodb';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository extends BaseRepository implements IUserRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id.toString() === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const userObject = {} as User
    const objectId = ObjectId.toString()

    Object.assign(userObject, {
      id: objectId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }, userData);

    this.users.push(userObject);

    return userObject;
  }

  public async update(userData: IUpdateUserDTO): Promise<User | undefined> {
    const {
      id,
      ...othersFieldsToUpdate
    } = userData

    const findIndex = this.users.findIndex(
      (findUser) => findUser.id.toString() === id,
    );

    const user = this.users[findIndex]
    Object.assign(user, othersFieldsToUpdate)

    return user;
  }
}
