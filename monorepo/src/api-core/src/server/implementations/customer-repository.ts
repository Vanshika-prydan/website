import { container } from 'tsyringe';
import CustomerRepository from '../../repositories/customer-repository';

const customerRepository = container.resolve(CustomerRepository);
export default customerRepository;
