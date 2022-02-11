import { mockAccount } from '../../../mock/account';
import { mockRole } from '../../../mock/role';
import { IAccount } from '../entities/Account';
import Permission from '../entities/Permission';
import { IAccountRepository } from '../interface-adapters/repositories/account-repository';

export const generateAccountRepositoryForAuthorization = (permission?: Permission) => {
  const account: IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: permission ? [permission] : [] }] };
  return { findById: jest.fn(() => Promise.resolve(account)) } as unknown as IAccountRepository;
};
