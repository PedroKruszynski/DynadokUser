import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IEntitieUser from '../infra/mongodb/entities/User';

interface IUsersRepository {
    findById(id: string): Promise<IEntitieUser | undefined>;
    findByEmail(email: string): Promise<IEntitieUser | undefined>;
    findAll(): Promise<IEntitieUser[]>;
    create(data: ICreateUserDTO): Promise<IEntitieUser>;
    update(data: IUpdateUserDTO): Promise<IEntitieUser | undefined>;
}

export default IUsersRepository;