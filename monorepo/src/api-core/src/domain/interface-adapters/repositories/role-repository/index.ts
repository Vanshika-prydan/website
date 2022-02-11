import { IRole } from '../../../entities/Role';
import { ICreateRolePayload } from './create-role-payload';

export interface IRoleRepository {
    getAll(): Promise<IRole[]>;
    create(payload: ICreateRolePayload): Promise<IRole>;
    update(role: IRole): Promise<IRole>;
}
