import { inject, injectable } from 'tsyringe';
import ChargeBookingUseCase from '../../bookings/charge-booking/charge-booking';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

@injectable()
export default class ChargeUnpaidBookingsUseCase {
  constructor (
    @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
    private readonly chargeBookingUseCase: ChargeBookingUseCase,
  ) { }

  async execute ():Promise<void> {
    const allBookings = await this.bookingRepository.getAll();
    const unpayedBookings = allBookings.filter(b => (!!b.completed && !b.paymentCompleted));
    unpayedBookings.forEach(async b => await this.chargeBookingUseCase.execute(b));
  }
}
