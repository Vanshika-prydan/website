import { NextFunction, Request, Response } from 'express';
import CompleteBookingUseCase from '../../../../domain/interactors/bookings/complete-booking';
import { BookingDTO } from '../../../models/booking.model';

export const buildMarkBookingAsCompletedController = (completeBooking:CompleteBookingUseCase) => async (req:Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const booking = await completeBooking.execute({ payload: req.params.bookingId, idOfExecutingAccount: req.accountId });
    return res.status(200).json(new BookingDTO(booking));
  } catch (e) {
    next(e);
  }
};
