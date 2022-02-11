import { CreditCardInterface } from '../../domain/entities/CreditCard';

export interface CreditCardModel {
    id:string;
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
    isPrimary?:boolean;
}

export default class CreditCardDTO implements CreditCardModel {
    id: string;
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
    isPrimary?:boolean;
    constructor (cc: CreditCardInterface) {
      this.id = cc.id;
      this.brand = cc.brand;
      this.expMonth = cc.expMonth;
      this.expYear = cc.expYear;
      this.last4 = cc.last4;
      this.isPrimary = cc.isPrimary;
    }
}
