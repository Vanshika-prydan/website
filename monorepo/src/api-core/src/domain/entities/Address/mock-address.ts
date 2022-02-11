import { v4 } from 'uuid';
import { IAddress } from '.';
import RecursivePartial from '../../../types/recursive-partial';

export default class MockAddress implements IAddress {
    addressId: string;
    street: string;
    postalCity: string;
    postalCode: string;
    country: 'SE';
    addressName?: string ;
    information?: string ;
    code?: string ;

    constructor (a:RecursivePartial<IAddress> = {}) {
      this.addressId = a.addressId ?? v4();
      this.street = a.street ?? 'Långholmsgatan 17';
      this.postalCity = a.postalCity ?? 'Stockholm';
      this.postalCode = a.postalCode ?? '11223';
      this.country = a.country ?? 'SE';
      this.addressName = a.addressName ?? undefined; ;
      this.information = a.information ?? undefined;
      this.code = a.code ?? undefined;
    }
}
