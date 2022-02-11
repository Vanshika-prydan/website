import { container } from 'tsyringe';
import StripePaymentService from '.';
import MockCustomer from '../../domain/entities/Customer/mock-customer';

describe('PaymentGateway stripe', () => {
  it('should get all cards', async () => {
    const gw = container.resolve(StripePaymentService);
    await gw.setDefaultPaymentMethod(new MockCustomer({ stripeId: 'cus_JoC86eD5wXEuR2' }), 'pm_1JAZmzGC3xqLdOCvEZnIqr6c');
    const cards = await gw.getAllPaymentMethods(new MockCustomer({ stripeId: 'cus_Jm1Qsea5YDCU8m' }));
    console.log(cards);
  });
});
