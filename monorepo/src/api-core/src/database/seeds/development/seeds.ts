import { container } from 'tsyringe';
import { createConnection, getRepository } from 'typeorm';
import { v4 } from 'uuid';
import AddCustomerAddressUseCase from '../../../domain/interactors/customer/add-customer-address';
import { IAddCustomerAddressPayload } from '../../../domain/interactors/customer/add-customer-address/types';
import CreateCustomerUseCase from '../../../domain/interactors/customer/create-customer';
import { ICreateCustomerPayload } from '../../../domain/interactors/customer/create-customer/types';
import { Account } from '../../entities/Account';
import { Employee } from '../../entities/Employee';
import { Role } from '../../entities/Role';
import { closeConnection } from '../../test-setup';

require('../../../server/register');

const createEmployee = async (name:string, domain:string) => {
  const employeeRole = await getRepository(Role).findOneOrFail('EMPLOYEE');
  const account = new Account({
    accountId: v4(),
    email: `${name}+employee@${domain}`,
    roles: [employeeRole],
    firstName: 'Anna',
    lastName: 'Ottosson',
    dateUpdated: new Date(),
    dateCreated: new Date(),
  });
  const createdAccount = await getRepository(Account).save(account);
  const employee = new Employee({ account: createdAccount, employeeId: v4() });
  const saved = await getRepository(Employee).save(employee);
  return saved;
};

const createCustomer = async (name:string, domain:string) => {
  const createCustomer = container.resolve(CreateCustomerUseCase);
  const payload:ICreateCustomerPayload = {
    email: `${name}+customer@${domain}`,
    firstName: 'Lars',
    lastName: 'Sjödahl',
    personalIdentityNumber: '861225-4634',
  };
  const createdCustomer = await createCustomer.execute({ payload });

  const addressPayload: IAddCustomerAddressPayload = {
    customerId: createdCustomer.customerId,
    information: 'hemma',
    street: 'Erksdalsgatan 41',
    postalCity: 'Stockholm',
    postalCode: '11122',
    country: 'SE',
    code: '9942',
    numberOfBathrooms: 2,
    homeAreaInM2: 100,
  };
  const addAddress = container.resolve(AddCustomerAddressUseCase);
  await addAddress.execute({ payload: addressPayload, idOfExecutingAccount: createdCustomer.account.accountId });

  return createdCustomer;
};

try {
  const email = process.argv[2].split('email=')[1];
  if (!email) throw new Error('No email param');
  const [name, domain] = email.split('@');
  console.log(name, domain);

  (async () => {
    await createConnection();

    await createEmployee(name, domain);
    await createCustomer(name, domain);

    await closeConnection();
  })();
} catch (e) {
  throw new Error("Missing email param of form: 'npm run seeds:development -- email=niklas@cleangreen.se'");
}
