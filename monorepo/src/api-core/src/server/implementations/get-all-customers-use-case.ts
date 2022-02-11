import GetAllCustomersUseCase from '../../domain/interactors/customer/get-all-customers';
import customerRepository from './customer-repository';
import accountRepository from './account-respository';

const getAllCustomersUseCase = new GetAllCustomersUseCase({ customerRepository, accountRepository });
export default getAllCustomersUseCase;
