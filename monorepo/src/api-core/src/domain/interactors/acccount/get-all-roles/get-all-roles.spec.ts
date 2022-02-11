import { mockAccount } from '../../../../../mock/account';
import { mockRole } from '../../../../../mock/role';
import AccountRepository from '../../../../repositories/account-respository';
import Permission from '../../../entities/Permission';
import { IRole } from '../../../entities/Role';
import { IRoleRepository } from '../../../interface-adapters/repositories/role-repository';
import { GetAllRolesUseCase } from './get-all-roles';

describe('GetAllRolesUseCase', () => {
  it('should return a list of all roles', async () => {
    const roles:IRole[] = [];
    const roleRepository = { getAll: jest.fn(() => Promise.resolve(roles)) } as unknown as IRoleRepository;
    const accountRepository = { findById: () => Promise.resolve({ ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.ROLE_LIST_ALL] }] }) } as unknown as AccountRepository;
    const useCase = new GetAllRolesUseCase({ roleRepository, accountRepository });
    await expect(useCase.execute({ idOfExecutingAccount: 'uuid' })).resolves.toBe(roles);
  });
});
