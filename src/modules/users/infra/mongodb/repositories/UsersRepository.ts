import Error from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import BaseRepository from '@shared/infra/mongodb/repositories';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/mongodb/entities/User';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import { ObjectId } from 'mongodb';

export default class UsersRepository
  extends BaseRepository
  implements IUserRepository
{
  constructor() {
    super('users');
  }

  public async findAll(): Promise<User[]> {
    const usersCollection = await this.getCollection();
    const usersArray = await usersCollection.find().toArray();

    // const users = usersArray.map(doc => ({
    //   id: doc._id,
    //   name: doc.name,
    //   email: doc.email,
    //   phone: doc.phone,
    //   created_at: doc.created_at,
    //   updated_at: doc.updated_at,
    // }))

    const users = usersArray.map(doc => (this.DocumentToObject<User>(doc)));

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const usersCollection = await this.getCollection();
    const userDocument = await usersCollection.findOne({
      _id: new ObjectId(id)
    });

    if (userDocument === null) {
      return undefined;
    }
    
    const user = this.DocumentToObject<User>(userDocument);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const usersCollection = await this.getCollection();
    const userDocument = await usersCollection.findOne({
      email: { $eq: email }  
    });

    if (userDocument === null) {
      return undefined;
    }
    
    const user = this.DocumentToObject<User>(userDocument);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const usersCollection = await this.getCollection();
    const result = await usersCollection.insertOne(userData);

    if (!result.acknowledged) {
      throw new Error("Failed to insert user");
    }

    console.log(result.insertedId.toString());

    const insertedUser = await this.findById(result.insertedId.toString());

    if (!insertedUser) {
      throw new Error("Failed to retrieve inserted user");
    }

    return insertedUser;
  }

  public async update(id: string, userData: IUpdateUserDTO): Promise<User> {
    const usersCollection = await this.getCollection();
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: userData },
      { upsert: false }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await this.findById(id);

    if (!updatedUser) {
      throw new Error("Failed to retrieve updated user");
    }

    return updatedUser;
  }
}
