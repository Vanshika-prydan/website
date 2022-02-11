import { CountryCode } from '../CountryCode';

export interface IAddress {
    addressId: string;
    street: string;
    postalCity: string;
    postalCode: string;
    country: CountryCode;
    addressName?: string ;
    information?: string ;
    code?:string;
}
