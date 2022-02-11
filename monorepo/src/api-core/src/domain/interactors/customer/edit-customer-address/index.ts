import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { ICustomer } from '../../../entities/Customer';
import { ICustomerAddress } from '../../../entities/CustomerAddress';
import { CUSTOMER_ADDRESS_REPOSITORY, ICustomerAddressRepository } from '../../../interface-adapters/repositories/customer-address-repository';
import { AddressService } from '../../../services/address-service';
import CustomerService from '../../../services/customer-service';
import RecursivePartial from '../../../../types/recursive-partial';

export interface RequestPayload {
    customerAddressId: string;
    fieldsToUpdate: RecursivePartial<ICustomerAddress>;
}

@injectable()
export default class EditCustomerAddressUseCase implements IUseCase<RequestPayload, ICustomerAddress> {
  constructor (
        @inject(CUSTOMER_ADDRESS_REPOSITORY) private readonly customerAddressRepository: ICustomerAddressRepository,
        private readonly customerService: CustomerService,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: RequestPayload; idOfExecutingAccount: string; }): Promise<ICustomerAddress> {
    const customer = await this.customerService.findByIdOrFail(idOfExecutingAccount);

    const address = this.findAddressById(customer, payload);

    const updatedAddress: ICustomerAddress = address;
    this.validateAndUpdateFields(payload, updatedAddress);

    await this.customerAddressRepository.save(updatedAddress);
    return updatedAddress;
  }

  private validateAndUpdateFields (payload: RequestPayload, updatedAddress: ICustomerAddress) {
    if (payload.fieldsToUpdate.address?.code)
      updatedAddress.address.code = AddressService.validateAndFormatCode(payload.fieldsToUpdate.address?.code);
  }

  private findAddressById (customer: ICustomer, payload: RequestPayload) {
    const address = customer.addresses?.find(a => a.customerAddressId === payload.customerAddressId);
    if (!address)
      throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
    return address;
  }
}
