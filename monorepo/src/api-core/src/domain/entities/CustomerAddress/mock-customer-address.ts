import { v4 } from 'uuid';
import { ICustomerAddress } from '.';
import RecursivePartial from '../../../types/recursive-partial';
import { IAddress } from '../Address';
import MockAddress from '../Address/mock-address';

export default class MockCustomerAddress implements ICustomerAddress {
    customerAddressId: string;
    isPrimaryAddress: boolean;
    address: IAddress;
    numberOfBathrooms?: number;
    homeAreaInM2?: number;

    constructor (c: RecursivePartial<ICustomerAddress> = {}) {
      this.customerAddressId = c.customerAddressId ?? v4();
      this.isPrimaryAddress = c.isPrimaryAddress ?? true;
      this.address = new MockAddress(c.address) ?? new MockAddress();
      this.numberOfBathrooms = c.numberOfBathrooms ?? 1;
      this.homeAreaInM2 = c.homeAreaInM2 ?? 100;
    }
}
