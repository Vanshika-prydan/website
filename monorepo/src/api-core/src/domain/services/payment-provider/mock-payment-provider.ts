import Stripe from 'stripe';

import { IPaymentProvider } from './interface';

export const mockPaymentProvider: IPaymentProvider = {
  registerCustomer: jest.fn(() => Promise.resolve({} as unknown as Stripe.Customer)),
  saveCard: jest.fn(() => Promise.resolve('secret')),
};
