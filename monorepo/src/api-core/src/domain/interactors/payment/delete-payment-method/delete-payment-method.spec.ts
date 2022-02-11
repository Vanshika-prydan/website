import DeletePaymentMethodUseCase, { RequestPayload } from '.';
import { mockAccount } from '../../../../../mock/account';
import MockCreditCard from '../../../entities/CreditCard/mock-credit-card';
import { PaymentGatewayInterface } from '../../../interface-adapters/gateways/payment-gateway';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { mockCustomer } from '../../../../../mock/customer';
import { ErrorCode } from '../../../entities/ErrorCode';

describe('delete-payment-method use case', () => {
  let usecase: DeletePaymentMethodUseCase;
  const payload: RequestPayload = { paymentMethodId: 'pm_1J01c7GC3xqLdOCvCnC9Y41b' };
  const idOfExecutingAccount = mockAccount.accountId;

  let customerRepository: ICustomerRepository;
  let paymentGateway: PaymentGatewayInterface;
  const mockCreditCardList = [new MockCreditCard({ id: 'pm_1J01c7GC3xqLdOCvCnC9Y41b' })];

  beforeEach(async () => {
    // @ts-ignore
    paymentGateway = {
      getAllPaymentMethods: jest.fn(() => Promise.resolve(mockCreditCardList)),
      deletePaymentMethod: jest.fn(() => Promise.resolve()),
    };
    // @ts-ignore
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) };
    usecase = new DeletePaymentMethodUseCase(customerRepository, paymentGateway);
    await usecase.execute({ payload, idOfExecutingAccount });
  });

  it('Should load the customer from the account id', async () => {
    expect(customerRepository.findByAccountId).toHaveBeenCalledWith(idOfExecutingAccount);
  });
  it('Should confirm that the payment method id belongs to the customer', async () => {
    expect((paymentGateway.getAllPaymentMethods)).toHaveBeenCalled();
  });

  it('Should call the paymentprovider delete if the account owns the id', () => {
    expect(paymentGateway.deletePaymentMethod).toHaveBeenCalledWith(payload.paymentMethodId);
  });

  it('Should throw access denied if the card does not belong to the custromer', async () => {
    // @ts-ignore
    paymentGateway = {
      getAllPaymentMethods: jest.fn(() => Promise.resolve([])),
      deletePaymentMethod: jest.fn(() => Promise.resolve()),
    };
    usecase = new DeletePaymentMethodUseCase(customerRepository, paymentGateway);
    await expect(usecase.execute({ payload, idOfExecutingAccount })).rejects.toThrow(ErrorCode.ACCESS_DENIED);
  });
});
