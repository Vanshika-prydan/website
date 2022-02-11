import { mockAccount } from '../../../../../mock/account';
import { SaveCardIntentUseCase } from './save-card-intent';
import { mockCustomerRepository } from '../../../interface-adapters/repositories/customer-repository/mock-customer-repository';
import { ErrorCode } from '../../../entities/ErrorCode';
import { PaymentGatewayInterface } from '../../../interface-adapters/gateways/payment-gateway';

describe('save-card-intent', () => {
  const idOfExecutingAccount = mockAccount.accountId;
  let usecase: SaveCardIntentUseCase;
  let returnvalue:{secret:string};
  let paymentGateway: PaymentGatewayInterface;

  beforeEach(async () => {
    // @ts-ignore
    paymentGateway = { createSetupIntent: jest.fn(() => Promise.resolve({ secret: 'secret' })) };
    usecase = new SaveCardIntentUseCase(mockCustomerRepository, paymentGateway);
    returnvalue = await usecase.execute({ idOfExecutingAccount });
  });

  it('Should call the createSetupIntent method', async () => {
    expect(paymentGateway.createSetupIntent).toHaveBeenCalled();
  });

  it('Should fetch the customer object', async () => {
    expect(mockCustomerRepository.findByAccountId).toHaveBeenCalledWith(idOfExecutingAccount);
  });

  it('should fail if the customer does not exist', async () => {
    const addPaymentMethod = new SaveCardIntentUseCase({ ...mockCustomerRepository, findByAccountId: jest.fn(() => Promise.resolve(undefined)) }, paymentGateway);
    await expect(addPaymentMethod.execute({ idOfExecutingAccount })).rejects.toThrowError(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
  });
  it('should return secret', () => {
    expect(returnvalue).toEqual({ secret: 'secret' });
  });
});
