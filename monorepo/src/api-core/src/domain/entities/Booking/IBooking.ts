import { IAddress } from '../Address';
import { IBookingAddon } from '../BookingAddon';
import { IBookingType } from '../BookingType';
import { ICustomer } from '../Customer';
import { IEmployee } from '../Employee';
import { FrameBookingInterface } from '../FrameBooking/IFrameBooking';

export interface BookingInterface {
    bookingId: string;
    frameBooking?: FrameBookingInterface;
    frameBookingId?: string;
    customer?: ICustomer;
    customerId: string;
    startTime: Date;
    endTime: Date;
    address?: IAddress;
    addressId: string;
    privateNotes?: string ;
    specialInstructions?: string ;
    employee?: IEmployee;
    employeeId: string;
    bookingType?: IBookingType;
    bookingTypeId: string;
    addons?: IBookingAddon[];
    completed: boolean;
    paymentCompleted: boolean;
    stripePaymentId?:string;
    cancelledAt?: Date;
}

export interface BookingWithBookingType extends BookingInterface {
    bookingType: NonNullable<BookingInterface['bookingType']>
}
export interface BookingWithAddons extends BookingInterface {
    addons: NonNullable<BookingInterface['addons']>
}
export interface BookingFullyDefined extends BookingInterface {
    customer: NonNullable<BookingInterface['customer']>;
    address: NonNullable<BookingInterface['address']>;
    employee: NonNullable<BookingInterface['employee']>;
    bookingType: NonNullable<BookingInterface['bookingType']>;
    addons: NonNullable<BookingInterface['addons']>;
}

export interface IBooking extends BookingFullyDefined {
}
