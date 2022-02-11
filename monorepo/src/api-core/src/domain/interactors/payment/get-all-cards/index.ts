import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { CreditCardInterface } from '../../../entities/CreditCard';
import { PaymentGatewayInterface, PAYMENT_GATEWAY_INTERFACE } from '../../../interface-adapters/gateways/payment-gateway';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';

export type RequestPayload = void;
export type ResponsePayload = CreditCardInterface[]

@injectable()
export default class GetAllCardsUseCase implements IUseCase<RequestPayload, ResponsePayload> {
  constructor (
      @inject(PAYMENT_GATEWAY_INTERFACE) private readonly paymentGateway: PaymentGatewayInterface,
      @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute ({ idOfExecutingAccount }: { idOfExecutingAccount: string ; }): Promise<ResponsePayload> {
    const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
    if (!customer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);

    const creditCards = await this.paymentGateway.getAllPaymentMethods(customer);

    return creditCards;
  }
}
