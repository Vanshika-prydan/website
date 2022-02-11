import IUseCase from '../../IUseCase';
import IFrameBookingRepository from '../../../interface-adapters/repositories/frame-booking-repository';
import BookingService from '../../../services/booking-service';
import { AutoCreateBookingsFromFrameBookingsSetup } from './types';

export class AutoCreateBookingsFromFrameBookingsUseCase implements IUseCase<void, void> {
   private readonly bookingService: BookingService;
   private readonly frameBookingRepository: IFrameBookingRepository;

   constructor (setup:AutoCreateBookingsFromFrameBookingsSetup) {
     this.bookingService = setup.bookingService;
     this.frameBookingRepository = setup.frameBookingRepository;
   }

   async execute (): Promise<void> {
     const activeBookings = await this.frameBookingRepository.findAllActive();
     const allPromises: Promise<void>[] = [];
     activeBookings.forEach(frameBooking => {
       allPromises.push(this.bookingService.createBookingsFromFrameBooking(frameBooking));
     });
     await Promise.all(allPromises);
   }
}
