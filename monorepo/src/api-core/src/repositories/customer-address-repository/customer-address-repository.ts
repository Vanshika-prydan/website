import { injectable } from 'tsyringe';
import { getConnection, getRepository } from 'typeorm';
import { Address } from '../../database/entities/Address';
import { Customer } from '../../database/entities/Customer';
import { CustomerAddress } from '../../database/entities/CustomerAddress';
import { ICustomerAddress } from '../../domain/entities/CustomerAddress';
import { ICustomerAddressRepository } from '../../domain/interface-adapters/repositories/customer-address-repository';
import { IAddPayload } from '../../domain/interface-adapters/repositories/customer-address-repository/add-payload';

@injectable()
export class CustomerAddressRepository implements ICustomerAddressRepository {
  async save (entity: ICustomerAddress): Promise<ICustomerAddress> {
    const customerAddress = new CustomerAddress(entity);
    await getRepository(CustomerAddress).save(customerAddress);
    return customerAddress;
  }

  async add (payload: IAddPayload): Promise<ICustomerAddress> {
    const customer = await getConnection().getRepository(Customer).findOneOrFail(payload.customerId);
    const address = new Address();
    address.addressName = payload.addressName;
    address.code = payload.code ?? undefined;
    address.country = payload.country;
    address.information = payload.information ?? undefined;
    address.postalCity = payload.postalCity;
    address.postalCode = payload.postalCode;
    address.street = payload.street;
    await getRepository(Address).save(address);

    const customerAddress = new CustomerAddress();
    customerAddress.address = address;
    customerAddress.customer = customer;
    customerAddress.numberOfBathrooms = payload.numberOfBathrooms;
    customerAddress.homeAreaInM2 = payload.homeAreaInM2;
    await getRepository(CustomerAddress).save(customerAddress);
    return customerAddress;
  }
}
