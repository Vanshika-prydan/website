import getAllCustomersUseCase from '../../../implementations/get-all-customers-use-case';
import { buildGetAllCosumersController } from './get-all-customers';

const getAllCosumersController = buildGetAllCosumersController({ getAllCustomersUseCase });

export default getAllCosumersController;
