import { mockCustomer } from './customer';
import { mockFrameBookingAddon } from './frame-booking-addon';
import { mockAddress } from './address';
import { mockEmployee } from './employee';
import { mockBookingType } from './booking-type';
import { FrameBookingFullyDefined } from '../src/domain/entities/FrameBooking/IFrameBooking';

export const mockFrameBooking: FrameBookingFullyDefined = {
  frameBookingId: 'c1b7a9f6-0c38-4244-b1d5-a1eaadb42e25',
  startTime: new Date('2020-01-01T00:00:00.000Z'),
  durationInMinutes: 120,
  occurrence: 'weekly',
  customer: mockCustomer,
  customerId: mockCustomer.customerId,
  address: mockAddress,
  addressId: mockAddress.addressId,
  employee: mockEmployee,
  employeeId: mockEmployee.employeeId,
  bookingType: mockBookingType,
  bookingTypeId: mockBookingType.bookingTypeId,
  frameBookingAddons: [mockFrameBookingAddon],

};
