import addCustomerAddressUseCase from '../../../implementations/add-customer-address-use-case';
import { buildAddAddressController } from './add-address.controller';

export { AddAddressRequestModel } from './add-address-request-model';

const addAddressController = buildAddAddressController({ addCustomerAddressUseCase });

export default addAddressController;
