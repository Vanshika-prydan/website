import { OccurrenceType } from '../definitions/Occurrence';

export type Mode = 'local' | 'development' | 'staging' | 'production';

export interface CreateCustomerRequestPayload {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber: string;
    personalIdentityNumber:string;
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
    occurrence: Exclude<'onetime', OccurrenceType>;
    durationInMinutes: number;
    addressId: string;
    privateNotes?: string;
    specialInstructions?: string;
    bookingTypeId: string;
    employeeId: string;
    bookingAddons?: BookingAddonEntity[];
  }

export interface UpdateBookingRequestPayload {
    addressId?: string;
    privateNotes?:string;
    specialInstructions?:string;
    employeeId?:string;
    bookingTypeId?:string;
    addonIds?:string[]
  }
