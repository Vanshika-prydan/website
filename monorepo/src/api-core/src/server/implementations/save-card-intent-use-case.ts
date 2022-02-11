import { container } from 'tsyringe';
import { PAYMENT_GATEWAY_INTERFACE } from '../../domain/interface-adapters/gateways/payment-gateway';
import { SaveCardIntentUseCase } from '../../domain/interactors/payment/save-card-intent/save-card-intent';
import { CUSTOMER_REPOSITORY_INTERFACE } from '../../domain/interface-adapters/repositories/customer-repository';
import StripePaymentService from '../../services/stripe-payment-service';
import CustomerRepository from '../../repositories/customer-repository';

container.register(CUSTOMER_REPOSITORY_INTERFACE, { useClass: CustomerRepository }).register(PAYMENT_GATEWAY_INTERFACE, { useClass: StripePaymentService });

const saveCardIntentUseCase = container.resolve(SaveCardIntentUseCase);

export default saveCardIntentUseCase;
