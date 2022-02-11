import { container } from 'tsyringe';
import CreateCustomer from '../../domain/interactors/customer/create-customer';
import { CUSTOMER_REPOSITORY_INTERFACE } from '../../domain/interface-adapters/repositories/customer-repository';
import { EMAIL_PROVIDER_INTERFACE } from '../../domain/services/email-service';
import CustomerRepository from '../../repositories/customer-repository';
import AWSSes from '../../services/email-service/aws-ses';

container.register(CUSTOMER_REPOSITORY_INTERFACE, { useClass: CustomerRepository }).register(EMAIL_PROVIDER_INTERFACE, { useClass: AWSSes });
const createCustomerUseCase = container.resolve(CreateCustomer);

export default createCustomerUseCase;
