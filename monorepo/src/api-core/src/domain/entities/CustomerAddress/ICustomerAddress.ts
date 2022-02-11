import { IAddress } from '../Address/IAddress';

export interface ICustomerAddress {
    customerAddressId:string;
    isPrimaryAddress: boolean;
    address: IAddress;
    numberOfBathrooms?: number ;
    homeAreaInM2?: number;
}
