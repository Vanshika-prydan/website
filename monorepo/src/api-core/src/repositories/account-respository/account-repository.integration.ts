import { Account } from '../../database/entities/Account';
import { Role } from '../../database/entities/Role';
import { closeConnection, openConnection } from '../../database/test-setup';
import Permission from '../../domain/entities/Permission';
import { ICreateAccountPayload } from '../../domain/interface-adapters/repositories/account-repository';
import { AccountRepository } from './account-repository';
import { getRepository } from 'typeorm';

const createAccountWithoutRolesParams:ICreateAccountPayload = {
  firstName: 'Anna',
  lastName: 'Ekström',
  email: 'email@hej.se',
  password: 'pass',
  phoneNumber: '0703344222',
};

const expectedResultWithoutRoles = {
  email: 'email@hej.se',
  firstName: 'Anna',
  lastName: 'Ekström',
  password: 'pass',
  phoneNumber: '0703344222',
  accountId: expect.any(String),
  dateCreated: expect.anything(),
  dateUpdated: expect.anything(),
  roles: [],

};

describe('Employee repository postgres', () => {
  let repo: AccountRepository;
  beforeEach(async () => {
    await openConnection();
    repo = new AccountRepository();
  });
  afterEach(async () => {
    await closeConnection();
  });

  describe('create', () => {
    it('Should be possible to create a new account', async () => {
      const created = await repo.create(createAccountWithoutRolesParams);

      expect(created).toEqual(expect.objectContaining(expectedResultWithoutRoles));
    });

    it('Should be possible to create a new employee with a role', async () => {
      const role = new Role();
      role.description = '';
      role.name = '';
      role.permissions = [Permission.EMPLOYEE_CREATE, Permission.EMPLOYEE_UPDATE];
      await getRepository(Role).save(role);

      const params:ICreateAccountPayload = {
        firstName: 'Anna',
        lastName: 'Ekström',
        email: 'email@hej.se',
        password: 'pass',
        phoneNumber: '0703344222',
        roleNames: [role.name],
      };

      const createdAcc = await repo.create(params);

      const expectedResult = {
        email: 'email@hej.se',
        firstName: 'Anna',
        lastName: 'Ekström',
        password: 'pass',
        phoneNumber: '0703344222',
        accountId: expect.any(String),
        dateCreated: expect.anything(),
        dateUpdated: expect.anything(),
        roles: [{ ...role }],
      };
      expect(createdAcc).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe('findByEmail', () => {
    it('should return undefined if no employee with the given email exists', async () => {
      await expect(repo.findByEmail('niklas@cleangreen.se')).resolves.toBeUndefined();
    });
    it('should return an employee if there exists one', async () => {
      await repo.create(createAccountWithoutRolesParams);
      await expect(repo.findByEmail('email@hej.se')).resolves.toEqual(expect.objectContaining(expectedResultWithoutRoles));
    });
  });
  describe('getAll', () => {
    it('should return an empty array if no employees exists', async () => {
      await expect(repo.getAll()).resolves.toEqual([]);
    });
    it('should return a list of employees', async () => {
      await repo.create(createAccountWithoutRolesParams);
      await expect(await repo.getAll()).toEqual(expect.arrayContaining([{ ...expectedResultWithoutRoles }]));
    });
  });
  describe('findByEmployeeId', () => {
    it('should return undefined if the employee does not exist', async () => {
      await expect(repo.findById('uuid')).resolves.toBeUndefined();
    });
    it('should return an employee with a given id', async () => {
      const account = new Account();
      account.accountId = '6e7aa9bb-adb5-4b67-a3a3-205d66546b5b';
      account.email = 'email@hej.se';
      account.firstName = 'first';
      account.lastName = 'last';
      account.roles = [];
      await getRepository(Account).save(account);

      const expected = {
        accountId: expect.any(String),
        firstName: 'first',
        lastName: 'last',
        email: 'email@hej.se',
        password: null,
        phoneNumber: null,
        dateCreated: expect.anything(),
        dateUpdated: expect.anything(),
        roles: [],
      };

      await expect(repo.findById('6e7aa9bb-adb5-4b67-a3a3-205d66546b5b')).resolves.toEqual(expect.objectContaining(expected));
    });
  });
});
