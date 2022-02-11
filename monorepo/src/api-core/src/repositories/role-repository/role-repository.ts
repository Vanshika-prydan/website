import { getConnection, getRepository } from 'typeorm';
import { Role } from '../../database/entities/Role';
import { IRole } from '../../domain/entities/Role';
import { IRoleRepository } from '../../domain/interface-adapters/repositories/role-repository';
import { ICreateRolePayload } from '../../domain/interface-adapters/repositories/role-repository/create-role-payload';

export class RoleRepository implements IRoleRepository {
  getAll (): Promise<IRole[]> {
    return getConnection().getRepository(Role).find();
  }

  async create (payload: ICreateRolePayload): Promise<IRole> {
    const role = new Role();
    role.description = payload.description;
    role.name = payload.name;
    role.permissions = payload.permissions;
    await getRepository(Role).save(role);
    return role;
  }

  update (role: IRole): Promise<IRole> {
    throw new Error('Method not implemented.');
  }
}
