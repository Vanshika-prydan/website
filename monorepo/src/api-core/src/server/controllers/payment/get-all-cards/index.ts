import { container } from 'tsyringe';
import { PAYMENT_GATEWAY_INTERFACE } from '../../../../domain/interface-adapters/gateways/payment-gateway';
import GetAllCardsUseCase from '../../../../domain/interactors/payment/get-all-cards';
import StripePaymentService from '../../../../services/stripe-payment-service';
import buildGetAllCardsController from './get-all-cards';

container.register(PAYMENT_GATEWAY_INTERFACE, {
  useClass: StripePaymentService,
});
const getAllCardsUseCase = container.resolve(GetAllCardsUseCase);

const getAllCardsController = buildGetAllCardsController(getAllCardsUseCase);

export default getAllCardsController;
