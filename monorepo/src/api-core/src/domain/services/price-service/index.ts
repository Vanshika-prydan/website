import { injectable } from 'tsyringe';
import { Occurrence, OccurrenceType } from '../../entities/Occurrence';
import { IBooking } from '../../entities/Booking';
import { getDurationInMinutesFromBooking } from '../booking-utils';
import { calculatePrice, calculatePriceInOreInclVATWithRUT } from './price-utils';

interface PriceServiceInterface {
    calculateChargeableAmount(booking:IBooking):Promise<number>
}

@injectable()
export default class PriceService implements PriceServiceInterface {
  calculateChargeableAmount (booking: IBooking):Promise<number> {
    let occurrence: OccurrenceType = Occurrence.ONETIME;
    if (booking.frameBooking)
      occurrence = booking.frameBooking.occurrence;

    return Promise.resolve(calculatePriceInOreInclVATWithRUT(calculatePrice(occurrence, getDurationInMinutesFromBooking(booking))));
  }
}
