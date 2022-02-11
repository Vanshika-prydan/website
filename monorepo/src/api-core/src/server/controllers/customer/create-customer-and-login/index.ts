import createCustomerUseCase from '../../../implementations/create-customer-use-case';
import { buildCreateCustomerAndLoginController } from './create-customer-and-login';

const createCustomerAndLoginController = buildCreateCustomerAndLoginController(createCustomerUseCase);

export default createCustomerAndLoginController;
