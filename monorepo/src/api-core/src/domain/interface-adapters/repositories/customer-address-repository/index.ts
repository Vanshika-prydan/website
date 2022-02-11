import { ICustomerAddress } from '../../../entities/CustomerAddress';
import { IAddPayload } from './add-payload';

export const CUSTOMER_ADDRESS_REPOSITORY = 'ICustomerAddressRepository';

export interface ICustomerAddressRepository {
    add(payload: IAddPayload):Promise<ICustomerAddress>;
    save(entity:ICustomerAddress):Promise<ICustomerAddress>;
}
