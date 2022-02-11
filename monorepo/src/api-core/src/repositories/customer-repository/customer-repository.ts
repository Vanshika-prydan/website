import { injectable } from 'tsyringe';
import { getConnection, getRepository } from 'typeorm';
import { Account } from '../../database/entities/Account';
import { Customer } from '../../database/entities/Customer';
import { Role } from '../../database/entities/Role';
import { ICustomer } from '../../domain/entities/Customer';
import { ICreateCustomerPayload } from '../../domain/interactors/customer/create-customer/types';
import ICustomerRepository from '../../domain/interface-adapters/repositories/customer-repository';

@injectable()
export class CustomerRepository implements ICustomerRepository {
  async findByPersonalIdentityNumber (personalIdentityNumber: string): Promise<ICustomer | undefined> {
    const account = await getConnection().getRepository(Account).findOne({ where: { personalIdentityNumber } });
    const customer = await getConnection().getRepository(Customer).findOne({ relations: ['account', 'account.roles', 'addresses', 'addresses.address'], where: { account } });
    return customer;
  }

  async findByPhoneNumber (phoneNumber: string): Promise<undefined | ICustomer> {
    const account = await getConnection().getRepository(Account).findOne({ where: { phoneNumber } });
    const customer = await getConnection().getRepository(Customer).findOne({ relations: ['account', 'account.roles', 'addresses', 'addresses.address'], where: { account } });
    return customer;
  }

  async findByAccountId (accountId: string): Promise<ICustomer | undefined> {
    const account = await getConnection().getRepository(Account).findOne({ where: { accountId } });
    const customer = await getConnection().getRepository(Customer).findOne({ relations: ['account', 'account.roles', 'addresses', 'addresses.address'], where: { account } });
    return customer;
  }

  async update (customer: ICustomer): Promise<ICustomer> {
    const u = await getRepository(Customer).findOneOrFail(customer.customerId);
    u.receiveMarketingCommunication = customer.receiveMarketingCommunication;
    u.stripeId = customer.stripeId;
    await getRepository(Customer).save(u);
    return u;
  }

  async create (payload: ICreateCustomerPayload): Promise<ICustomer> {
    const customerRole = await getRepository(Role).findOneOrFail('CUSTOMER');
    // try {
    const accountRepo = getConnection().getRepository(Account);
    const account = accountRepo.create();
    account.email = payload.email;
    account.firstName = payload.firstName;
    account.lastName = payload.lastName;
    account.phoneNumber = payload.phoneNumber;
    account.password = payload.password;
    account.personalIdentityNumber = payload.personalIdentityNumber;
    account.roles = [customerRole];
    await getRepository(Account).save(account);

    const customerRepo = getConnection().getRepository(Customer);
    const customer = customerRepo.create();
    customer.account = account;
    customer.receiveMarketingCommunication = payload.receiveMarketingCommunication ?? false;
    customer.stripeId = payload.stripeId;
    await getRepository(Customer).save(customer);
    return customer;
    /* } catch (e) {
      throw new Error(ErrorCode.CONSTRAINT_VIOLATED);
    } */
  }

  async findByEmail (email: string): Promise<ICustomer | undefined> {
    const account = await getConnection().getRepository(Account).findOne({ where: { email } });
    const customer = await getConnection().getRepository(Customer).findOne({ relations: ['account', 'account.roles', 'addresses', 'addresses.address'], where: { account } });
    return customer;
  }

  getAll (): Promise<ICustomer[]> {
    return getConnection().getRepository(Customer).find({ relations: ['account', 'account.roles', 'addresses', 'addresses.address'] });
  }

  findById (customerId: string): Promise<ICustomer | undefined> {
    return getConnection().getRepository(Customer).findOne({ where: { customerId }, relations: ['account', 'account.roles', 'addresses', 'addresses.address'] });
  }

  static initiate () {
    const instance = new CustomerRepository();
    return instance;
  }
}
