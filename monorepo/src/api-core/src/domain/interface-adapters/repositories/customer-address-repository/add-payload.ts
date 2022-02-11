import { CountryCode } from '../../../entities/CountryCode';

export interface IAddPayload {
    customerId: string;
    information?: string | null;
    street: string;
    postalCity: string;
    postalCode: string;
    country: CountryCode;
    code?: string | null;
    addressName?: string;
    numberOfBathrooms?:number,
    homeAreaInM2?:number,
}
