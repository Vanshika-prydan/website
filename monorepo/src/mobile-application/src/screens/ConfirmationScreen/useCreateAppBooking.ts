import { BookingModel } from '../../models/booking.model';
import { FrameBookingModel } from '../../models/frame-booking.model';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apiService from '../../services/api-service';
import {
  CreateCustomerRequestPayload,
  AddCustomerAddressRequestPayload,
  CreateBookingRequestPayload,
  CreateFrameBookingRequestPayload,
  Occurrence,
  HOME_CLEANING,
} from '../../services/api-service/types';
import AuthenticationService from '../../services/authentication-service';
import { RootState } from '../../store/rootReducer';
import { CustomerModel } from 'models/customer.model';

export const useCreateAppBooking = () => {
  const booking = useSelector((state: RootState) => state.makeBooking);
  const [isCreating, setIsCreating] = useState(false);

  const createCustomerAndLogin = async () => {
    const customerPayload: CreateCustomerRequestPayload = {
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      personalIdentityNumber: booking.personalIdentityNumber,
      receiveMarketingCommunication: booking.acceptsCommunication,
    };
    return AuthenticationService.createCustomerAndLogin(customerPayload);
  };

  const addAddressToCustomer = async (customerId: string) => {
    const addressPayload: AddCustomerAddressRequestPayload = {
      street: booking.street,
      postalCity: booking.postalCity,
      postalCode: booking.postalCode,
      country: 'SE',
      code: booking.doorCode,
      homeAreaInM2: booking.homeAreaInM2 ?? undefined,
      numberOfBathrooms: booking.numberOfBathrooms ?? undefined,
    };
    return apiService.addCustomerAddress(addressPayload, customerId);
  };

  const addBooking = async (
    addressId: string
  ): Promise<FrameBookingModel | BookingModel> => {
    const bookingPayload: CreateBookingRequestPayload &
      CreateFrameBookingRequestPayload = {
        startTime: new Date(booking.startTime ?? Date.now()),
        occurrence: booking.occurrence ?? Occurrence.ONETIME,
        durationInMinutes: booking.durationInMinutes ?? 0,
        addressId,
        bookingTypeId: HOME_CLEANING,
        employeeId: booking.selectedEmployeeId ?? '',
        bookingAddons: booking.addonIds.map((addonId) => ({
          addonId,
          numberOfUnits: 1,
        })),
      };
    if (bookingPayload.occurrence === Occurrence.ONETIME) {
      return apiService.createBooking(bookingPayload);
    } else {
      return apiService.createFrameBooking(bookingPayload);
    }
  };

  const create = async (): Promise<CustomerModel> => {
    setIsCreating(true);

    try {
      const { customer } = await createCustomerAndLogin();
      const customerWithAddress = await addAddressToCustomer(
        customer.customerId
      );
      const addressId = customerWithAddress.addresses![0].address.addressId;
      await addBooking(addressId);
      setIsCreating(false);
      return customerWithAddress;
    } catch (e) {
      console.log(e);
      setIsCreating(false);
      throw e;
    }
  };
  return {
    isCreating,
    create,
  };
};
