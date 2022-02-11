import createCustomerUseCase from '../../../implementations/create-customer-use-case';
import { buildCreateCustomerController } from './create-customer';
export { CreateCustomerRequestModel } from './create-customer-request-model';

const createCustomerController = buildCreateCustomerController(createCustomerUseCase);

export default createCustomerController;
