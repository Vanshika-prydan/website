import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../entities/ErrorCode';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/customer-repository';
import { ICustomer } from '../../entities/Customer/ICustomer';

@injectable()
export class CustomerService {
  constructor (
      @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
  ) {}

  public async findByIdOrFail (customerId:string):Promise<ICustomer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    return customer;
  }

  public async findByAccountIdOrFail (accountId:string):Promise<ICustomer> {
    const customer = await this.customerRepository.findByAccountId(accountId);
    if (!customer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    return customer;
  }

  public static isCustomer (customerOrCustomerId:ICustomer | string): customerOrCustomerId is ICustomer {
    return (customerOrCustomerId as ICustomer).customerId !== undefined;
  }

  public static async loadCustomerById (customerRepository: ICustomerRepository, customerId:string): Promise<ICustomer> {
    const foundCustomer = await customerRepository.findById(customerId);
    if (!foundCustomer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    return foundCustomer;
  }

  public static async ensurePresentCustomer (customerRepository: ICustomerRepository, customerOrCustomerId: ICustomer|string): Promise<ICustomer> {
    if (CustomerService.isCustomer(customerOrCustomerId)) return customerOrCustomerId;
    return CustomerService.loadCustomerById(customerRepository, customerOrCustomerId);
  }

  public static async loadCustomerFromAccountId (customerRepository: ICustomerRepository, accountId: string): Promise<ICustomer> {
    const foundCustomer = await customerRepository.findByAccountId(accountId);
    if (!foundCustomer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    return foundCustomer;
  }

  public async loadCustomerFromAccountId (accountId: string): Promise<ICustomer> {
    return CustomerService.loadCustomerFromAccountId(this.customerRepository, accountId);
  }
}

export default CustomerService;
