import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { PaymentGatewayInterface, PAYMENT_GATEWAY_INTERFACE } from '../../../interface-adapters/gateways/payment-gateway';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';

export interface RequestPayload {
    paymentMethodId: string;
}

@injectable()
export default class DeletePaymentMethodUseCase implements IUseCase<RequestPayload, void> {
  constructor (
        @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
        @inject(PAYMENT_GATEWAY_INTERFACE) private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: RequestPayload ; idOfExecutingAccount: string }): Promise<void> {
    const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
    if (!customer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);

    const cards = await this.paymentGateway.getAllPaymentMethods(customer);
    if (!cards.map(c => c.id).includes(payload.paymentMethodId)) throw new Error(ErrorCode.ACCESS_DENIED);

    await this.paymentGateway.deletePaymentMethod(payload.paymentMethodId);
  }
}
