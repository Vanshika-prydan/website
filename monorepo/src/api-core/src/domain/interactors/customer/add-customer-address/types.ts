import { CountryCode } from '../../../entities/CountryCode';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { ICustomerAddressRepository } from '../../../interface-adapters/repositories/customer-address-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';

export interface IAddCustomerAddressPayload {
    customerId: string;
    information?: string | null;
    street: string;
    postalCity: string;
    postalCode: string;
    country: CountryCode;
    code?: string | null;
    addressName?: string;
    numberOfBathrooms?: number;
    homeAreaInM2?: number;
}
export interface ISetup {
    customerRepository: ICustomerRepository;
    accountRepository:IAccountRepository;
    customerAddressRepository :ICustomerAddressRepository;
}
