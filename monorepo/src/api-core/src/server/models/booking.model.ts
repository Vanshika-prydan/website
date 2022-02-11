import validator from 'validator';
import { IBooking } from '../../domain/entities/Booking';
import { AddressDTO, AddressModel } from './address.model';
import { BookingAddonDTO, BookingAddonModel } from './booking-addon.model';
import { BookingTypeDTO, BookingTypeModel } from './booking-type.model';
import { CustomerDTO, CustomerModel } from './customer.model';
import { PublicEmployeeDTO, PublicEmployeeModel } from './public-employee.model';

export interface BookingModel {
    bookingId: string;
    FrameBookingId?: string;
    customer: CustomerModel;
    startTime: string;
    endTime: string;
    address: AddressModel;
    specialInstructions?: string;
    employee: PublicEmployeeModel;
    bookingType: BookingTypeModel;
    addons?: BookingAddonModel[];
    completed: boolean;
    // paymentCompleted: boolean;
    stripePaymentId? :string;
    cancelledAt?: Date;
}

export class BookingDTO implements BookingModel {
    public readonly bookingId: string;
    public readonly FrameBookingId?: string;

    public readonly customer: CustomerModel;
    public readonly startTime: string;
    public readonly endTime: string;
    public readonly address: AddressModel;
    public readonly specialInstructions?: string | undefined;
    public readonly employee: PublicEmployeeModel;
    public readonly bookingType: BookingTypeModel;
    public readonly addons?: BookingAddonModel[];
    public readonly completed: boolean;
    public readonly paymentCompleted: boolean;
    public readonly stripePaymentId?: string ;
    public readonly cancelledAt?: Date;

    constructor (booking:IBooking) {
      this.FrameBookingId = booking.frameBooking?.frameBookingId ?? undefined;
      this.bookingId = booking.bookingId;
      this.customer = new CustomerDTO(booking.customer);
      this.startTime = booking.startTime.toJSON();
      this.endTime = booking.endTime.toJSON();
      this.address = new AddressDTO(booking.address);
      this.specialInstructions = booking.specialInstructions ? validator.escape(booking.specialInstructions) : undefined;
      this.employee = new PublicEmployeeDTO(booking.employee);
      this.bookingType = new BookingTypeDTO(booking.bookingType);
      this.completed = booking.completed;
      this.paymentCompleted = booking.paymentCompleted;
      // this.stripePaymentId = booking.stripePaymentId;
      this.cancelledAt = booking.cancelledAt;

      if (booking.addons) this.addons = booking.addons.map(addon => new BookingAddonDTO(addon));
    }
}
