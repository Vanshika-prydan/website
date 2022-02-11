export interface CreateCustomerRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
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
  homeAreaInM2?: number;
  numberOfBathrooms?: number;
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

export const Occurrence = {
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  FOURWEEKLY: 'fourweekly',
  ONETIME: 'onetime',
} as const;

export type OccurrenceType = typeof Occurrence[keyof typeof Occurrence];

export const HOME_CLEANING = '6a1d4fbd-398a-48b2-ad13-e51f4048abe1';

export interface UpdateBookingRequestPayload {
  addressId?: string;
  privateNotes?: string;
  specialInstructions?: string;
  employeeId?: string;
  bookingTypeId?: string;
  addonIds?: string[];
}
