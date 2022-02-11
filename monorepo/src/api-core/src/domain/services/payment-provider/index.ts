
import Stripe from 'stripe';
import { injectable } from 'tsyringe';
import { ErrorCode } from '../../entities/ErrorCode';
import { ICustomer } from '../../entities/Customer';
import { IPaymentProvider } from './interface';

if (!process.env.STRIPE_API_SECRET) throw new Error('Config error: 45235k2');
const stripe = new Stripe(process.env.STRIPE_API_SECRET, { apiVersion: '2020-08-27' });

@injectable()
export default class PaymentProvider implements IPaymentProvider {
  constructor () {
    return this;
  }

  public async registerCustomer (customer:ICustomer):Promise<Stripe.Customer> {
    const params: Stripe.CustomerCreateParams = {
      email: customer.account.email,
      name: `${customer.account.firstName} ${customer.account.lastName}`,
    };
    const createdCustomer: Stripe.Customer = await stripe.customers.create(params);
    return createdCustomer;
  }

  public async saveCard (customer:ICustomer):Promise<string> {
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.stripeId!,
    });
    if (process.env.NODE_ENV !== 'production') console.log(setupIntent.client_secret);
    return setupIntent.client_secret || '';
  }

  private async listPaymentMethods (customer: ICustomer) {
    if (!customer.stripeId) throw new Error('Stripe id does not exist');

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.stripeId,
      type: 'card',
    });

    return paymentMethods;
  }

  public async charge (customer: ICustomer, amoutInOre: number):Promise<string> {
    if (!customer.stripeId) throw new Error('Stripe id does not exist');

    // @ts-ignore
    let paymentMethodId:undefined | string = (await stripe.customers.retrieve(customer.stripeId!))?.invoice_settings?.default_payment_method;

    if (!paymentMethodId) {
      const paymentMethods = await this.listPaymentMethods(customer);
      paymentMethodId = paymentMethods.data[0].id;
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amoutInOre,
        currency: 'sek',
        customer: customer.stripeId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
      });
      return paymentIntent.id;
    } catch (err) {
      // @ts-ignore
      console.log('Error code is: ', err.code);
      // @ts-ignore
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw?.payment_intent?.id);
      console.log('PI retrieved: ', paymentIntentRetrieved.id);

      throw new Error(ErrorCode.PAYMENT_FAILED);
    }
  }
}
