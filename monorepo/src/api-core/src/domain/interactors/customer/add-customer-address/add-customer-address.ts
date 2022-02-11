import IUseCase from '../../IUseCase';
import { ICustomer } from '../../../entities/Customer';
import Permission from '../../../entities/Permission';
import { CUSTOMER_ADDRESS_REPOSITORY, ICustomerAddressRepository } from '../../../interface-adapters/repositories/customer-address-repository';
import { IAddPayload } from '../../../interface-adapters/repositories/customer-address-repository/add-payload';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import { IAddCustomerAddressPayload } from './types';
import { ErrorCode } from '../../../entities/ErrorCode';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { AccountService } from '../../../services/account-service';
import { AddressService } from '../../../services/address-service';
import CustomerAddressService from '../../../services/customer-address-service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AddCustomerAddressUseCase implements IUseCase<IAddCustomerAddressPayload, ICustomer> {
  constructor (
    @inject(CUSTOMER_ADDRESS_REPOSITORY) private readonly customerAddressRepository :ICustomerAddressRepository,
    @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
    @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository:IAccountRepository,
  ) {}

  private validateDataAndReturnPayload (payload: IAddCustomerAddressPayload): IAddPayload {
    return {
      customerId: payload.customerId,
      information: AddressService.validateAndFormatInformation(payload.information),
      street: AddressService.validateAndFormatStreet(payload.street),
      postalCity: AddressService.validateAndFormatPostalCity(payload.postalCity),
      postalCode: AddressService.validateAndFormatPostalCode(payload.postalCode),
      country: AddressService.validateAndFormatCountry(payload.country),
      code: AddressService.validateAndFormatCode(payload.code),
      addressName: AddressService.validateAndFormatAddressName(payload.addressName),
      numberOfBathrooms: CustomerAddressService.validateAndFormatNumberOfBathrooms(payload.numberOfBathrooms),
      homeAreaInM2: CustomerAddressService.validateAndFormatHomeAreaInM2(payload.homeAreaInM2),
    };
  }

  async execute ({ payload, idOfExecutingAccount }: { payload: IAddCustomerAddressPayload ; idOfExecutingAccount:string }): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(payload.customerId);
    if (!customer) throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    if (customer.account.accountId !== idOfExecutingAccount)
      await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.CUSTOMER_ADD_AND_BIND_ADDRESS);

    await this.customerAddressRepository.add(this.validateDataAndReturnPayload(payload));
    const updatedCustomer = await this.customerRepository.findById(payload.customerId);

    return updatedCustomer ?? customer;
  }
}
