import { inject, injectable } from 'tsyringe';
import IUseCase from '../../../IUseCase';
import { PaymentGatewayInterface, PAYMENT_GATEWAY_INTERFACE } from '../../../../interface-adapters/gateways/payment-gateway';
import CustomerService from '../../../../services/customer-service';

@injectable()
export default class SetDefaultPaymentMethodUseCase implements IUseCase<string, void> {
  constructor (
     @inject(PAYMENT_GATEWAY_INTERFACE) private readonly paymentGateway: PaymentGatewayInterface,
     private readonly customerService: CustomerService,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: string; idOfExecutingAccount: string }): Promise<void> {
    const customer = await this.customerService.findByAccountIdOrFail(idOfExecutingAccount);
    await this.paymentGateway.setDefaultPaymentMethod(customer, payload);
  }
}
