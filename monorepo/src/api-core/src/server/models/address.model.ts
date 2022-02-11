import validator from 'validator';
import { IAddress } from '../../domain/entities/Address';

export interface AddressModel {
  addressId: string,
    street: string,
    postalCode: string,
    country: string,
    postalCity: string,
    addressName?: string,
    information?: string,
    code?: string,
}

export class AddressDTO implements AddressModel {
  addressId: string;
    street: string;
    postalCode: string;
    country: string;
    postalCity: string;
    addressName?: string;
    information?: string;
    code?: string;

    constructor (
      {
        addressId,
        street,
        postalCode,
        country,
        postalCity,
        addressName,
        information,
        code,
      }: IAddress,
    ) {
      this.addressId = addressId;
      this.street = validator.escape(street);
      this.postalCode = validator.escape(postalCode);
      this.country = validator.escape(country);
      this.postalCity = validator.escape(postalCity);
      this.addressName = addressName ? validator.escape(addressName) : undefined;
      this.information = information ? validator.escape(information) : undefined;
      this.code = code ? validator.escape(code) : undefined;
    }
}
