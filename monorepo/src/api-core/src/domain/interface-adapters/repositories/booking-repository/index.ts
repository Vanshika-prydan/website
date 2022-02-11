import { BookingLightInterface } from '../../../entities/BookingLight';
import { BookingFullyDefined } from '../../../entities/Booking/IBooking';
import { ICreateBookingPayload } from './create-booking-payload';
import { UpdateBookingRepositoryPayload } from './update-booking-repository-payload';

export const BOOKING_REPOSITORY_INTERFACE = 'IBookingRepository';

export interface GetBookingConfig {
    from?:Date; to?:Date;
}
export interface IBookingRepository {
    create(payload: ICreateBookingPayload):Promise<BookingFullyDefined>;
    getAll(config?:GetBookingConfig):Promise<BookingFullyDefined[]>;
    getLightBookings(config?:GetBookingConfig):Promise<BookingLightInterface[]>;
    save(booking:BookingFullyDefined):Promise<BookingFullyDefined>;
    saveLight(booking:BookingLightInterface):Promise<BookingLightInterface>;
    update(payload: UpdateBookingRepositoryPayload):Promise<BookingFullyDefined>;
    getById(bookingId:string):Promise<BookingFullyDefined | undefined>;
    getByCustomerId(customerId:string):Promise<BookingFullyDefined[]>;
    getByEmployeeId(employeeId:string):Promise<BookingFullyDefined[]>;
    findByFrameBookingId(frameBookingId: string):Promise<BookingFullyDefined[]>;
    findBookingLightsByFrameBooking(frameBookingId: string):Promise<BookingLightInterface[]>;
    delete(bookingId: string): Promise<void>;
    findBookingLightsByEmployee(employeeId:string): Promise<BookingLightInterface[]>;
}
