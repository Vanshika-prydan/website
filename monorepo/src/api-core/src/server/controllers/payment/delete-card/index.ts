import { container } from 'tsyringe';
import { PAYMENT_GATEWAY_INTERFACE } from '../../../../domain/interface-adapters/gateways/payment-gateway';
import DeletePaymentMethodUseCase from '../../../../domain/interactors/payment/delete-payment-method';
import { CUSTOMER_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/customer-repository';
import StripePaymentService from '../../../../services/stripe-payment-service';
import CustomerRepository from '../../../../repositories/customer-repository';
import buildDeleteCardController from './delete-card.controller';

container.register(PAYMENT_GATEWAY_INTERFACE, { useClass: StripePaymentService }).register(CUSTOMER_REPOSITORY_INTERFACE, { useClass: CustomerRepository });

const deletePaymentMethodUseCase = container.resolve(DeletePaymentMethodUseCase);

const deleteCardController = buildDeleteCardController(deletePaymentMethodUseCase);

export default deleteCardController;
