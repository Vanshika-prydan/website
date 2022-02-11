
import { mockCustomer } from './customer';
import { mockAddress } from './address';
import { mockEmployee } from './employee';
import { mockBookingType } from './booking-type';
import { BookingFullyDefined } from '../src/domain/entities/Booking';

export const mockBooking: BookingFullyDefined = Object.freeze({
  bookingId: 'f4e36459-829f-4248-8197-e2a70cdbdf7b',
  FrameBooking: undefined,
  customer: mockCustomer,
  customerId: mockCustomer.customerId,
  startTime: new Date('2024-03-01'),
  endTime: new Date('2024-03-02'),
  address: mockAddress,
  addressId: mockAddress.addressId,
  privateNotes: '',
  specialInstructions: '',
  employee: mockEmployee,
  employeeId: mockEmployee.employeeId,
  bookingType: mockBookingType,
  bookingTypeId: mockBookingType.bookingTypeId,
  addons: [],
  completed: false,
  paymentCompleted: false,
});
