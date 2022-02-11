import { v4 } from 'uuid';
import { Optional } from '../../../types/optional';
import Address from '../Address';
import { ICustomerAddress } from './ICustomerAddress';

export class CustomerAddress implements ICustomerAddress {
  readonly customerAddressId: string;
  readonly isPrimaryAddress: boolean;
  readonly address: Address;
  readonly numberOfBathrooms?: number ;
  readonly homeAreaInM2?: number;

  constructor (data:Optional<ICustomerAddress, 'customerAddressId'>) {
    this.customerAddressId = data.customerAddressId ?? v4();
    this.isPrimaryAddress = data.isPrimaryAddress;
    this.address = new Address(data.address);
    this.homeAreaInM2 = data.homeAreaInM2;
    this.numberOfBathrooms = data.numberOfBathrooms;
  }
}
