import { container } from 'tsyringe';
import SetDefaultPaymentMethodUseCase from '../../../../domain/interactors/customer/payments/set-default-payment-method';
import { PAYMENT_GATEWAY_INTERFACE } from '../../../../domain/interface-adapters/gateways/payment-gateway';
import { CUSTOMER_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/customer-repository';
import StripePaymentService from '../../../../services/stripe-payment-service';
import CustomerRepository from '../../../../repositories/customer-repository';
import buildSetDefaultPaymentMethodController from './controller';

container
  .register(PAYMENT_GATEWAY_INTERFACE, { useClass: StripePaymentService })
  .register(CUSTOMER_REPOSITORY_INTERFACE, { useClass: CustomerRepository });

const setDefaultPaymentMethodFacade = container.resolve(SetDefaultPaymentMethodUseCase);

const setDefaultPaymentMethodController = buildSetDefaultPaymentMethodController(setDefaultPaymentMethodFacade);

export default setDefaultPaymentMethodController;
