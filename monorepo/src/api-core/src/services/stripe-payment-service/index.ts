import Stripe from 'stripe';
import { injectable } from 'tsyringe';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { CreditCardInterface } from '../../domain/entities/CreditCard';
import { ICustomer } from '../../domain/entities/Customer';
import { PaymentGatewayInterface } from '../../domain/interface-adapters/gateways/payment-gateway';

@injectable()
export default class StripePaymentService implements PaymentGatewayInterface {
  private readonly stripe: Stripe;
  constructor () {
    this.stripe = new Stripe(process.env.STRIPE_API_SECRET ?? '', { apiVersion: '2020-08-27' });
  }

  private ensureStripeCustomerIdOrFail (customer: ICustomer) {
    if (!customer.stripeId) throw new Error(ErrorCode.MISSING_STRIPE_ID);
  }

  async createSetupIntent (customer: ICustomer): Promise<{secret:string}> {
    this.ensureStripeCustomerIdOrFail(customer);
    const response = await this.stripe.setupIntents.create({ customer: customer.stripeId });
    if (!response.client_secret) throw new Error('error with client secret');
    return { secret: response.client_secret };
  }

  async setDefaultPaymentMethod (customer:ICustomer, paymentMethodId:string): Promise<void> {
    this.ensureStripeCustomerIdOrFail(customer);
    // @ts-ignore
    await this.stripe.customers.update(customer.stripeId!, { invoice_settings: { default_payment_method: paymentMethodId } });
  }

  async deletePaymentMethod (id: string): Promise<void> {
    await this.stripe.paymentMethods.detach(id);
  }

  async getAllPaymentMethods (customer: ICustomer): Promise<CreditCardInterface[]> {
    this.ensureStripeCustomerIdOrFail(customer);

    // @ts-ignore
    const defaultMaymentMethodId = (await this.stripe.customers.retrieve(customer.stripeId!))?.invoice_settings?.default_payment_method;

    const paymentMethods = await this.stripe.paymentMethods.list({
      customer: customer.stripeId!,
      type: 'card',
    });

    return paymentMethods.data.map(pm => ({
      id: pm.id,
      // @ts-ignore
      brand: pm.card.brand,
      // @ts-ignore
      expMonth: pm.card.exp_month,
      // @ts-ignore
      expYear: pm.card.exp_year,
      // @ts-ignore
      last4: pm.card.last4,
      isPrimary: pm.id === defaultMaymentMethodId,
    }));
  }
}
