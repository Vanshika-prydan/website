import { Role } from '../../database/entities/Role';
import { openConnection, closeConnection } from '../../database/test-setup';
import Permission from '../../domain/entities/Permission';
import { ICreateRolePayload } from '../../domain/interface-adapters/repositories/role-repository/create-role-payload';
import { RoleRepository } from './role-repository';
import { getRepository } from 'typeorm';

describe('RoleRepository', () => {
  beforeEach(async () => {
    await openConnection();
  });
  afterEach(async () => {
    await closeConnection();
  });
  it('should be possible to create a new role', async () => {
    const repo = new RoleRepository();
    const payload:ICreateRolePayload = {
      description: 'Nya rollen',
      name: 'ADMIN',
      permissions: [Permission.CUSTOMER_ADD_AND_BIND_ADDRESS, Permission.EMPLOYEE_CREATE],
    };
    const expectedValue = {
      description: 'Nya rollen',
      name: 'ADMIN',
      permissions: ['CUSTOMER_ADD_AND_BIND_ADDRESS', 'EMPLOYEE_CREATE'],
    };
    await expect(repo.create(payload)).resolves.toEqual(expect.objectContaining(expectedValue));
  });
  it('Should get a list with all roles', async () => {
    const role = new Role();
    role.description = 'Ny roll';
    role.name = 'Developer';
    role.permissions = [Permission.CUSTOMER_LIST_ALL];
    await getRepository(Role).save(role);

    const repo = new RoleRepository();
    await expect(repo.getAll()).resolves.toEqual([role]);
  });
});
