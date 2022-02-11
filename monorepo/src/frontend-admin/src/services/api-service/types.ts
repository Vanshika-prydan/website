import { Day } from '../../models/employee-default-availability';

export interface CreateEmployeeRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  roleNames?: string[];
}
export interface CreateCustomerRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  personalIdentityNumber: string;
  receiveMarketingCommunication?: boolean;
}

export interface AddCustomerAddressRequestPayload {
  information?: string;
  street: string;
  postalCity: string;
  postalCode: string;
  country: string;
  code?: string;
  addressName?: string;
}

export interface BookingAddonEntity {
  addonId: string;
  numberOfUnits: number;
}
export interface CreateBookingRequestPayload {
  customerId?: string;
  startTime: Date;
  durationInMinutes: number;
  addressId: string;
  privateNotes?: string;
  specialInstructions?: string;
  bookingTypeId: string;
  employeeId: string;
  bookingAddons?: BookingAddonEntity[];
}
export interface CreateFrameBookingRequestPayload {
  customerId?: string;
  startTime: Date;
  endTime?: Date;
  occurrence: string;
  durationInMinutes: number;
  addressId: string;
  privateNotes?: string;
  specialInstructions?: string;
  bookingTypeId: string;
  employeeId: string;
  bookingAddons?: BookingAddonEntity[];
}

export interface EditAccountRequestPayload {
  accountId: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UpdateBookingRequestPayload {
  addressId?: string;
  privateNotes?: string;
  specialInstructions?: string;
  employeeId?: string;
  bookingTypeId?: string;
}

export interface SetAvailabilityRequestPayload {
  day: Day;
  startHour: number;
  startMinute?: number;
  endHour: number;
  endMinute?: number;
}

export interface EditFrameBookingRequestPayload {
  frameBookingId: string;
  employeeId: string;
}
