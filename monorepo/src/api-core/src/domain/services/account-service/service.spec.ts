import { mockAccount } from '../../../../mock/account';
import { mockRole } from '../../../../mock/role';
import { ErrorCode } from '../../entities/ErrorCode';
import { IAccount } from '../../entities/Account';
import Permission from '../../entities/Permission';
import { IAccountRepository } from '../../interface-adapters/repositories/account-repository';
import { AccountService } from '.';
import { IRole } from '../../entities/Role';

describe('Account service', () => {
  it('should generate a new password with 12 chars', async () => {
    const pw = await AccountService.generatePassword();
    expect(pw.rawPassword).toHaveLength(16);
  });
  describe('isAccount', () => {
    it('should return true if an account i provided', () => {
      const account: IAccount = { ...mockAccount, accountId: 'uuid' };
      expect(AccountService.isAccount(account)).toBeTruthy();
    });
    it('should return false if an accountId is provided', () => {
      const accountId = 'uuid';
      expect(AccountService.isAccount(accountId)).toBeFalsy();
    });
  });
  describe('loadAccountById', () => {
    it('should return an account', async () => {
      const result = {};
      const accountRepository = { findById: jest.fn(() => Promise.resolve(result)) } as unknown as IAccountRepository;
      await expect(AccountService.loadAccountByIdOrFail(accountRepository, 'uuid')).resolves.toBe(result);
      expect(accountRepository.findById).toHaveBeenCalledWith('uuid');
    });
    it('should throw error if the account does not exist', async () => {
      const accountRepository = { findById: jest.fn(() => Promise.resolve(undefined)) } as unknown as IAccountRepository;
      await expect(AccountService.loadAccountByIdOrFail(accountRepository, 'uuid')).rejects.toThrowError(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    });
  });
  describe('ensurePresentAccount', () => {
    it('should get an account from the repository with an uuid', async () => {
      const result = {};
      const accountId = 'uuid';
      const accountRepository = { findById: jest.fn(() => Promise.resolve(result)) } as unknown as IAccountRepository;
      await expect(AccountService.ensurePresentAccount(accountRepository, accountId)).resolves.toBe(result);
    });
    it('should return the same account if it was called with an account', async () => {
      const account: IAccount = { ...mockAccount, accountId: 'uuid' };
      const accountRepository = { } as unknown as IAccountRepository;
      await expect(AccountService.ensurePresentAccount(accountRepository, account)).resolves.toBe(account);
    });
  });
  describe('loadAccountByIdAndAuthorizePermission', () => {
    it('should authorize with a valid account id', async () => {
      const account: IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.EMPLOYEE_UPDATE] }] };
      const accountRepository = { findById: jest.fn(() => Promise.resolve(account)) } as unknown as IAccountRepository;
      const result = await AccountService.loadAccountAndAuthorize(accountRepository, 'accountId', Permission.EMPLOYEE_UPDATE);
      expect(result).toBe(account);
    });
    it('should throw if the account does not have the needed permission', async () => {
      const account: IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [] }] };
      const accountRepository = { findById: jest.fn(() => Promise.resolve(account)) } as unknown as IAccountRepository;
      await expect(AccountService.loadAccountAndAuthorize(accountRepository, 'accountId', Permission.EMPLOYEE_UPDATE)).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
    });
    it('should throw if the account does not exist', async () => {
      const accountRepository = { findById: jest.fn(() => Promise.resolve()) } as unknown as IAccountRepository;
      await expect(AccountService.loadAccountAndAuthorize(accountRepository, 'accountId', Permission.EMPLOYEE_UPDATE)).rejects.toThrowError(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    });
  });
  describe('getPermissionsFromAccount', () => {
    it('should get an empty array', () => {
      const account:IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [] }] };
      expect(AccountService.getPermissionsFromAccount(account)).toEqual([]);
    });
    it('should get the permissions from one role', () => {
      const account:IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.ACCESS_TO_BACK_OFFICE, Permission.CUSTOMER_LIST_ALL] }] };
      expect(AccountService.getPermissionsFromAccount(account)).toEqual([Permission.ACCESS_TO_BACK_OFFICE, Permission.CUSTOMER_LIST_ALL]);
    });
    it('should get the permissions from multiple roles role', () => {
      const account:IAccount = {
        ...mockAccount,
        roles: [{
          ...mockRole,
          permissions:
         [Permission.ACCESS_TO_BACK_OFFICE,
           Permission.CUSTOMER_LIST_ALL],
        },
        {
          ...mockRole,
          permissions:
         [Permission.EMPLOYEE_UPDATE],
        }],
      };
      expect(AccountService.getPermissionsFromAccount(account)).toEqual([Permission.ACCESS_TO_BACK_OFFICE, Permission.CUSTOMER_LIST_ALL, Permission.EMPLOYEE_UPDATE]);
    });
    it('should only get one permission if it is present in more than one role', () => {
      const account:IAccount = {
        ...mockAccount,
        roles: [{
          ...mockRole,
          permissions: [Permission.ACCESS_TO_BACK_OFFICE, Permission.CUSTOMER_LIST_ALL],
        },
        {
          ...mockRole,
          permissions: [Permission.EMPLOYEE_UPDATE, Permission.ACCESS_TO_BACK_OFFICE],
        }],
      };
      expect(AccountService.getPermissionsFromAccount(account)).toEqual([Permission.ACCESS_TO_BACK_OFFICE, Permission.CUSTOMER_LIST_ALL, Permission.EMPLOYEE_UPDATE]);
    });
  });

  describe('accountHasPermission', () => {
    it('should return true if the permission exists', () => {
      const account:IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.ACCESS_TO_BACK_OFFICE] }] };
      expect(AccountService.accountHasPermission(account, Permission.ACCESS_TO_BACK_OFFICE)).toBe(true);
    });
    it('should return false if the permission does not exist', () => {
      const account:IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.BOOKING_ADD_BOOKING_TO_CUSTOMER] }] };
      expect(AccountService.accountHasPermission(account, Permission.ACCESS_TO_BACK_OFFICE)).toBe(false);
    });
  });

  describe('loadFromAccountIdAndCheckPermission', () => {
    it('should return false if the user does not exist', async () => {
      const accountRepository = { findById: jest.fn(() => Promise.resolve()) } as unknown as IAccountRepository;
      const result = await AccountService.loadFromAccountIdAndCheckPermission(accountRepository, 'accountId', Permission.EMPLOYEE_UPDATE);
      expect(result).toBe(false);
    });
    it('should return false if the user does not have the right permission', async () => {
      const account:IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.ACCESS_TO_BACK_OFFICE] }] };
      const accountRepository = { findById: jest.fn(() => Promise.resolve(account)) } as unknown as IAccountRepository;
      const result = await AccountService.loadFromAccountIdAndCheckPermission(accountRepository, 'accountId', Permission.EMPLOYEE_UPDATE);
      expect(result).toBe(false);
    });
    it('should return true if the user have the right permission', async () => {
      const account:IAccount = { ...mockAccount, roles: [{ ...mockRole, permissions: [Permission.EMPLOYEE_UPDATE] }] };
      const accountRepository = { findById: jest.fn(() => Promise.resolve(account)) } as unknown as IAccountRepository;
      const result = await AccountService.loadFromAccountIdAndCheckPermission(accountRepository, 'accountId', Permission.EMPLOYEE_UPDATE);
      expect(result).toBe(true);
    });
  });

  describe('Authorization', () => {
    it('Should authorize an employee with a correct access', () => {
      const role = {
        name: 'string',
        permissions: [Permission.EMPLOYEE_CREATE],
      } as unknown as IRole;
      const account = { roles: [role] } as unknown as IAccount;

      expect(() => AccountService.authorize(account, Permission.EMPLOYEE_CREATE));
    });

    it('should throw an error if the employee has no roles', () => {
      const account = { roles: [] } as unknown as IAccount;
      expect(() => AccountService.authorize(account, Permission.EMPLOYEE_CREATE)).toThrowError(ErrorCode.ACCESS_DENIED);
    });

    it('Should throw an error if the employee does not have the correct permission', () => {
      const role = {
        name: 'string',
        permissions: [Permission.EMPLOYEE_UPDATE],
      } as unknown as IRole;
      const account = { roles: [role] } as unknown as IAccount;

      expect(() => AccountService.authorize(account, Permission.EMPLOYEE_CREATE)).toThrowError(ErrorCode.ACCESS_DENIED);
    });
  });
});
