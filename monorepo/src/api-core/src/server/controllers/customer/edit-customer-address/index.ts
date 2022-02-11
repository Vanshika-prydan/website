import { container } from 'tsyringe';
import EditCustomerAddressUseCase from '../../../../domain/interactors/customer/edit-customer-address';
import { CUSTOMER_ADDRESS_REPOSITORY } from '../../../../domain/interface-adapters/repositories/customer-address-repository';
import { CUSTOMER_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/customer-repository';
import CustomerAddressRepository from '../../../../repositories/customer-address-repository';
import CustomerRepository from '../../../../repositories/customer-repository';
import { buildEditCustomerAddress } from './controller';

container.register(CUSTOMER_ADDRESS_REPOSITORY, { useClass: CustomerAddressRepository }).register(CUSTOMER_REPOSITORY_INTERFACE, { useClass: CustomerRepository });

const editCustomerAddressFacade = container.resolve(EditCustomerAddressUseCase);

const editCustomerAddressController = buildEditCustomerAddress(editCustomerAddressFacade);

export default editCustomerAddressController;
