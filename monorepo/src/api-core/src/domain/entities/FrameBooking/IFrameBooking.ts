import { IAddress } from '../Address';
import { IBookingType } from '../BookingType';
import { ICustomer } from '../Customer';
import { IEmployee } from '../Employee';
import { IFrameBookingAddon } from '../FrameBookingAddon';
import { FrameBookingOccurrence } from './FrameBookingOccurrence';

export interface IFrameBookingOld {
    frameBookingId: string;
    startTime: Date;
    durationInMinutes: number;
    endTime?: Date ;
    occurrence: FrameBookingOccurrence;
    customer: ICustomer;
    address: IAddress;
    employee: IEmployee;
    privateNotes?: string ;
    specialInstructions?: string;
    bookingType: IBookingType;
    frameBookingAddons?: IFrameBookingAddon[]
}

export interface FrameBookingInterface {
    frameBookingId: string;
    startTime: Date;
    durationInMinutes: number;
    endTime?: Date ;
    occurrence: FrameBookingOccurrence;
    customer?: ICustomer;
    customerId: string;
    address?: IAddress;
    addressId: string;
    employee?: IEmployee;
    employeeId: string;
    privateNotes?: string ;
    specialInstructions?: string;
    bookingType?: IBookingType;
    bookingTypeId: string;
    frameBookingAddons?: IFrameBookingAddon[]
}

export interface FrameBookingFullyDefined extends FrameBookingInterface {
    customer: NonNullable<FrameBookingInterface['customer']>;
    address: NonNullable<FrameBookingInterface['address']>;
    employee: NonNullable<FrameBookingInterface['employee']>;
    bookingType: NonNullable<FrameBookingInterface['bookingType']>;
    frameBookingAddons: NonNullable<FrameBookingInterface['frameBookingAddons']>;
}
