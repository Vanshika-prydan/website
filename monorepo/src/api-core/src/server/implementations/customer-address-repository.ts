import { ICustomerAddressRepository } from '../../domain/interface-adapters/repositories/customer-address-repository';
import CustomerAddressRepository from '../../repositories/customer-address-repository';

const customerAddressRepository: ICustomerAddressRepository = new CustomerAddressRepository();
export default customerAddressRepository;
