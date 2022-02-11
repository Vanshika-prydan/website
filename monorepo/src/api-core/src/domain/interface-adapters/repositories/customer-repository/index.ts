import { ICustomer } from '../../../entities/Customer';
import { ICreateCustomerPayload } from '../../../interactors/customer/create-customer/types';

export const CUSTOMER_REPOSITORY_INTERFACE = 'ICustomerRepository';
 interface ICustomerRepository {
     create(payload:ICreateCustomerPayload):Promise<ICustomer>;
     update(customer: ICustomer):Promise<ICustomer>;
     findByEmail(email:string):Promise<ICustomer | undefined>;
     findByPersonalIdentityNumber(personalIdentityNumber:string): Promise<ICustomer | undefined>;
     findByPhoneNumber(phoneNumber: string): Promise<ICustomer | undefined>;
     getAll():Promise<ICustomer[]>;
     findById(customerId: string):Promise<ICustomer | undefined>;
     findByAccountId(accountId:string):Promise<ICustomer | undefined>
 }

export default ICustomerRepository;
