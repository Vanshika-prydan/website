import { ICustomerAddress } from '../../domain/entities/CustomerAddress';
import { AddressDTO, AddressModel } from './address.model';

export interface CustomerAddressModel{
    customerAddressId: string;
    isPrimaryAddress: boolean;
    address: AddressModel;
    numberOfBathrooms?: number;
    homeAreaInM2?: number;
}

export class CustomerAddressDto implements CustomerAddressModel {
    customerAddressId: string;
    isPrimaryAddress: boolean;
    address: AddressModel;
    numberOfBathrooms?: number;
    homeAreaInM2?: number;

    constructor ({ customerAddressId, isPrimaryAddress, address, numberOfBathrooms, homeAreaInM2 }:ICustomerAddress) {
      this.customerAddressId = customerAddressId;
      this.isPrimaryAddress = isPrimaryAddress;
      this.address = new AddressDTO(address);
      this.numberOfBathrooms = numberOfBathrooms ?? undefined;
      this.homeAreaInM2 = homeAreaInM2 ?? undefined;
    }
}
