import { CreditCardInterface } from '../../../entities/CreditCard';
import { ICustomer } from '../../../entities/Customer';

export const PAYMENT_GATEWAY_INTERFACE = 'PaymentGatewayInterface';
export interface PaymentGatewayInterface {
    createSetupIntent(customer:ICustomer):Promise<{secret:string}>;
    getAllPaymentMethods(customer:ICustomer):Promise<CreditCardInterface[]>;
    deletePaymentMethod(id: string): Promise<void>;
    setDefaultPaymentMethod (customer:ICustomer, paymentMethodId:string): Promise<void>;
};
