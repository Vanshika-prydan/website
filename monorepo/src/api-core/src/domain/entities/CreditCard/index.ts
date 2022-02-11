export { default as MockCreditCard } from './mock-credit-card';

export interface CreditCardInterface {
    id:string;
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
    isPrimary?:boolean;
}

export default class CreditCard implements CreditCardInterface {
    id: string;
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
    isPrimary?: boolean | undefined;

    constructor (data:CreditCardInterface) {
      this.id = data.id;
      this.brand = data.brand;
      this.expMonth = data.expMonth;
      this.expYear = data.expYear;
      this.last4 = data.last4;
      this.isPrimary = data.isPrimary;
    }
}
