import { container } from 'tsyringe';
import GetCustomerUseCase from '../../../../domain/interactors/customer/get-customer';
import { ACCOUNT_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-repository';
import { CUSTOMER_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/customer-repository';
import AccountRepository from '../../../../repositories/account-respository';
import CustomerRepository from '../../../../repositories/customer-repository';
import { buildGetCustomerController } from './controller';

container.register(ACCOUNT_REPOSITORY_INTERFACE, { useClass: AccountRepository }).register(CUSTOMER_REPOSITORY_INTERFACE, { useClass: CustomerRepository });
const facade = container.resolve(GetCustomerUseCase);
const getCustomerController = buildGetCustomerController(facade);

export default getCustomerController;
