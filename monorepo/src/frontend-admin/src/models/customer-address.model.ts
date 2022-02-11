import { AddressModel } from './address.model';

export interface CustomerAddressModel {
    customerAddressId: string;
    isPrimaryAddress: boolean;
    address: AddressModel;
}
