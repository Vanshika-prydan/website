import Stripe from 'stripe';
import { ICustomer } from '../../entities/Customer';

export const PAYMENT_PROVIDER_INTERFACE = 'IPaymentProvider';

export interface IPaymentProvider {
    registerCustomer(customer:ICustomer):Promise<Stripe.Customer>;
    saveCard(customer:ICustomer):Promise<string>;
}
