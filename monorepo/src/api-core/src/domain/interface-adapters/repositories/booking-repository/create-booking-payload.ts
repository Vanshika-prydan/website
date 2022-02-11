import { AddAddonEntity } from '../../../interactors/bookings/create-booking/types';

export interface ICreateBookingPayload {
    customerId: string;
    frameBookingId?: string;
    startTime: Date;
    durationInMinutes: number;
    addressId: string;
    privateNotes?:string;
    specialInstructions?: string;
    bookingTypeId: string;
    employeeId: string;
    bookingAddons?:AddAddonEntity[]
}
