import validator from 'validator';
import { FrameBookingOccurrence } from '../../domain/entities/FrameBooking/FrameBookingOccurrence';
import { FrameBookingFullyDefined } from '../../domain/entities/FrameBooking/IFrameBooking';
import { AddressDTO, AddressModel } from './address.model';
import { BookingAddonDTO, BookingAddonModel } from './booking-addon.model';
import { BookingTypeDTO, BookingTypeModel } from './booking-type.model';
import { CustomerDTO, CustomerModel } from './customer.model';
import { PublicEmployeeDTO, PublicEmployeeModel } from './public-employee.model';

export interface FrameBookingModel {
    frameBookingId: string;
    customer: CustomerModel;
    startTime: string;
    endTime?: string;
    durationInMinutes: number;
    occurrence: FrameBookingOccurrence;
    address: AddressModel;
    specialInstructions?: string;
    privateNotes?: string;
    employee: PublicEmployeeModel;
    bookingType: BookingTypeModel;
    addons?: BookingAddonModel[];
}

export class FrameBookingDTO implements FrameBookingModel {
    public readonly frameBookingId: string;
    public readonly customer: CustomerModel;
    public readonly startTime: string;
    public readonly endTime?: string;
    public readonly durationInMinutes: number;
    public readonly occurrence: FrameBookingOccurrence;
    public readonly privateNotes?: string;
    public readonly address: AddressModel;
    public readonly specialInstructions?: string | undefined;
    public readonly employee: PublicEmployeeModel;
    public readonly bookingType: BookingTypeModel;
    public readonly addons?: BookingAddonModel[];

    constructor (booking:FrameBookingFullyDefined) {
      this.frameBookingId = booking.frameBookingId;
      this.customer = new CustomerDTO(booking.customer);
      this.startTime = booking.startTime.toJSON();
      this.endTime = booking.endTime ? booking.endTime.toJSON() : undefined;
      this.address = new AddressDTO(booking.address);
      this.specialInstructions = booking.specialInstructions ? validator.escape(booking.specialInstructions) : undefined;
      this.employee = new PublicEmployeeDTO(booking.employee);
      this.bookingType = new BookingTypeDTO(booking.bookingType);
      this.privateNotes = booking.privateNotes ? validator.escape(booking.privateNotes) : undefined;
      this.occurrence = booking.occurrence;
      this.durationInMinutes = booking.durationInMinutes;

      if (booking.frameBookingAddons) this.addons = booking.frameBookingAddons.map(addon => new BookingAddonDTO(addon));
    }
}
