import { CustomerAddressModel } from '../../models/customer-address.model';

export interface AddressState {
  addresses: CustomerAddressModel[];
  isLoading: boolean;
}
