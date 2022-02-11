
import { getRepository } from 'typeorm';
import { HOME_CLEANING } from '../../domain/config/pre-defined-booking-type-ids';
import logging from '../../utilities/logging';
import { BookingType } from '../entities/BookingType';

export const setupBookingTypes = async () => {
  if (await getRepository(BookingType).findOne(HOME_CLEANING)) return;
  logging.info('Creating hemstädning');
  const bookingType = new BookingType();
  bookingType.bookingTypeId = HOME_CLEANING;
  bookingType.name = 'Hemstädning';
  bookingType.description = '';
  await getRepository(BookingType).save(bookingType);
};
