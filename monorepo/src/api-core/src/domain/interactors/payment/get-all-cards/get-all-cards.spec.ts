import GetAllCardsUseCase, { ResponsePayload } from '.';
import { mockAccount } from '../../../../../mock/account';
import { mockCustomer } from '../../../../../mock/customer';
import MockCreditCard from '../../../entities/CreditCard/mock-credit-card';
import { PaymentGatewayInterface } from '../../../interface-adapters/gateways/payment-gateway';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';

describe('getAllCards use case', () => {
  let usecase: GetAllCardsUseCase;
  let customerRepository: ICustomerRepository;
  let paymentGateway: PaymentGatewayInterface;
  let result: ResponsePayload;
  const mockCreditCardList = [new MockCreditCard()];
  beforeEach(async () => {
    // @ts-ignore
    paymentGateway = { getAllPaymentMethods: jest.fn(() => Promise.resolve(mockCreditCardList)) };
    // @ts-ignore
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) };
    usecase = new GetAllCardsUseCase(paymentGateway, customerRepository);
    result = await usecase.execute({ idOfExecutingAccount: mockAccount.accountId });
  });

  it('should fetch a customer from the account id', async () => {
    expect(customerRepository.findByAccountId).toHaveBeenCalledWith(mockAccount.accountId);
  });

  it('should make a call to the payment gateway to fetch all cards', async () => {
    expect(paymentGateway.getAllPaymentMethods).toHaveBeenCalled();
  });

  it('should return a list of credit cards', () => {
    expect(result).toEqual(mockCreditCardList);
  });
});
