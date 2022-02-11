import { container } from 'tsyringe';
import AddCustomerAddressUseCase from '../../domain/interactors/customer/add-customer-address';

const addCustomerAddressUseCase = container.resolve(AddCustomerAddressUseCase);

export default addCustomerAddressUseCase;
