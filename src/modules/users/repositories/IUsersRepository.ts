import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/mongodb/entities/User';

interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    create(data: ICreateUserDTO): Promise<User>;
    update(id: string, user: IUpdateUserDTO): Promise<User>;
}

export default IUsersRepository;