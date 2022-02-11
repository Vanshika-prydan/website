import { CreditCardInterface } from '.';

export default class MockCreditCard implements CreditCardInterface {
    id: string;
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
    isPrimary?:boolean;

    constructor (data: Partial<CreditCardInterface> = {}) {
      this.id = data.id ?? 'card_1IzioDGC3xqLdOCvH4Zc09TT';
      this.brand = data.brand ?? 'visa';
      this.expMonth = data.expMonth ?? 10;
      this.expYear = data.expYear ?? 2024;
      this.last4 = data.last4 ?? '1111';
      this.isPrimary = data.isPrimary ?? true;
    }
}
