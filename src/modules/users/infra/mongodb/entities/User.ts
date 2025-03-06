import IBaseEntity from '@shared/infra/mongodb/entities';

export default interface IEntitieUser extends IBaseEntity {
    name: string;
    email: string;
    phone: string;
}
