import { v4 } from 'uuid';
import { IAddress } from '.';
import { Optional } from '../../../types/optional';

export class Address implements IAddress {
  readonly addressId: string;
  readonly street: string;
  readonly postalCity: string;
  readonly postalCode: string;
  readonly country: 'SE';
  readonly addressName?: string;
  readonly information?: string;
  readonly code?: string ;

  constructor (a:Optional<IAddress, 'addressId'>) {
    this.addressId = a.addressId ?? v4();
    this.street = a.street;
    this.postalCode = a.postalCode;
    this.country = a.country;
    this.postalCity = a.postalCity;
    this.addressName = a.addressName ?? undefined;
    this.information = a.information ?? undefined;
    this.code = a.code ?? undefined;
  }
}
