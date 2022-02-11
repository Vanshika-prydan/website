import SetDefaultPaymentMethodUseCase from '.';
import MockCustomer from '../../../../entities/Customer/mock-customer';
import { PaymentGatewayInterface } from '../../../../interface-adapters/gateways/payment-gateway';
import CustomerService from '../../../../services/customer-service';

describe('set-default-payment-method facade', () => {
  it('should call the set-default payment gateway', async () => {
    const customer = new MockCustomer();
    // @ts-ignore
    const customerService: CustomerService = { findByAccountIdOrFail: jest.fn(() => Promise.resolve(customer)) };
    // @ts-ignore
    const paymentGateway: PaymentGatewayInterface = { setDefaultPaymentMethod: jest.fn(() => Promise.resolve()) };
    await new SetDefaultPaymentMethodUseCase(paymentGateway, customerService).execute({ payload: 'paymentId', idOfExecutingAccount: 'uuid' });
    expect(paymentGateway.setDefaultPaymentMethod).toHaveBeenCalledWith(customer, 'paymentId');
  });
});
