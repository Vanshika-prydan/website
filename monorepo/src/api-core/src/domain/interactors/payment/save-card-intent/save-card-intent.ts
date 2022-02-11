import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { PaymentGatewayInterface, PAYMENT_GATEWAY_INTERFACE } from '../../../interface-adapters/gateways/payment-gateway';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';

type RequestPayload =void;
type ResponsePayload = {secret:string};
@injectable()
export class SaveCardIntentUseCase implements IUseCase<RequestPayload, ResponsePayload> {
  constructor (
    @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
    @inject(PAYMENT_GATEWAY_INTERFACE) private readonly paymentGateway: PaymentGatewayInterface) {}

  async execute ({ idOfExecutingAccount }: { idOfExecutingAccount: string }): Promise<ResponsePayload> {
    const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
    if (!customer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    return this.paymentGateway.createSetupIntent(customer);
  }
}
