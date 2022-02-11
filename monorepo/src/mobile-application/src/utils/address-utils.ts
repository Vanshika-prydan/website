import apiService from '../services/api-service';
import { CustomerAddressModel } from '../models/customer-address.model';

type CAM = CustomerAddressModel[];

export const isHomeAddress = (a: CustomerAddressModel): boolean =>
  a.address.addressName === 'Hemadress' || !a.address.addressName;
export const filterHomeAddresses = (addresses: CAM): CAM =>
  addresses.filter(isHomeAddress);

export const isWorkAddress = (a: CustomerAddressModel): boolean =>
  a.address.addressName === 'Kontor';
export const filterWorkAddresses = (addresses: CAM): CAM =>
  addresses.filter(isWorkAddress);

export const isCountryHouseAddresses = (a: CustomerAddressModel): boolean =>
  a.address.addressName === 'Landställe';

export const filterCountryHouseAddresses = (addresses: CAM): CAM =>
  addresses.filter(isCountryHouseAddresses);

export const fetchAddressesByCustomerId = async (
  customerId: string
): Promise<CAM> => {
  return (await apiService.getCustomer(customerId)).addresses ?? [];
};
