
import { getConnection, getRepository } from 'typeorm';
import { Role } from './entities/Role';
import { Customer } from './entities/Customer';
import { CustomerAddress } from './entities/CustomerAddress';
import { Address } from './entities/Address';
import AccountService from '../domain/services/account-service';
import { Account } from './entities/Account';
import { Employee } from './entities/Employee';

export const setup = async () => {
//  await createConnection();
  // Setup the role
  const developerRole = await getConnection().getRepository(Role).findOneOrFail('DEVELOPER');
  const developer = new Account();
  developer.email = 'niklas@cleangreen.se';
  developer.firstName = 'Niklas';
  developer.lastName = 'Johansson';
  developer.password = await AccountService.validateAndEncryptPassword('3r4etgkfohke_RGGL45y!');
  developer.roles = [developerRole];
  developer.phoneNumber = '0704570608';
  await getRepository(Account).save(developer);

  const employeeRole = await getConnection().getRepository(Role).findOneOrFail('EMPLOYEE');

  const employeeAccount = new Account();
  employeeAccount.email = 'employee@cleangreen.se';
  employeeAccount.firstName = 'Stefan';
  employeeAccount.lastName = 'Holm';
  employeeAccount.password = await AccountService.validateAndEncryptPassword('3r4etgkfohke_RGGL45y!');
  employeeAccount.roles = [employeeRole];
  employeeAccount.phoneNumber = '0704434455';
  await getRepository(Account).save(employeeAccount);

  const employee = new Employee();
  employee.account = employeeAccount;
  await getRepository(Employee).save(employee);
  await getConnection().close();

  const customerRole = await getConnection().getRepository(Role).findOneOrFail('CUSTOMER');

  const customerAccount1 = new Account();
  customerAccount1.email = 'customer@customer.se';
  customerAccount1.firstName = 'Anna';
  customerAccount1.lastName = 'Ekström';
  customerAccount1.password = await AccountService.validateAndEncryptPassword('3r4etgkfohke_RGGL45y!');
  customerAccount1.phoneNumber = '0701234455';
  customerAccount1.roles = [customerRole];
  await getRepository(Account).save(customerAccount1);

  const customer1 = new Customer();
  customer1.account = customerAccount1;
  await getRepository(Customer).save(customer1);

  const address1 = new Address();
  address1.code = '1144';
  address1.country = 'SE';
  address1.information = 'Some information';
  address1.postalCity = 'Stockholm';
  address1.postalCode = '11553';
  address1.street = 'Hornsgatan 43';
  await getRepository(Address).save(address1);

  const customerAddress1 = new CustomerAddress();
  customerAddress1.customer = customer1;
  customerAddress1.address = address1;
  await getRepository(CustomerAddress).save(customerAddress1);

  const customerAccount2 = new Account();
  customerAccount2.email = 'customer2@customer.se';
  customerAccount2.firstName = 'Olof';
  customerAccount2.lastName = 'Wretling';
  customerAccount2.password = await AccountService.validateAndEncryptPassword('3r4etgkfohke_RGGL45y!');
  customerAccount2.phoneNumber = '0706665544';
  customerAccount2.roles = [customerRole];
  await getRepository(Account).save(customerAccount2);

  const customer2 = new Customer();
  customer2.account = customerAccount2;
  await getRepository(Customer).save(customer2);
};
