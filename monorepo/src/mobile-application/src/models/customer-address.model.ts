import { AddressModel } from './address.model';

export interface CustomerAddressModel {
  customerAddressId: string;
  isPrimaryAddress: boolean;
  address: AddressModel;
  homeAreaInM2?: number;
  numberOfBathrooms?: number;
}
