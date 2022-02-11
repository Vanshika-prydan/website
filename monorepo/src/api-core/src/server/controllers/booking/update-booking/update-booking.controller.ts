import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import UpdateBookingUseCase from '../../../../domain/interactors/bookings/update-booking';
import { BookingDTO } from '../../../models/booking.model';

export const buildUpdateBookingController = (updateBookingUseCase: UpdateBookingUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  const bookingId = req.params?.bookingId;
  if (bookingId) {
    const payload = {
      bookingId,
      fieldsToUpdate: req.body,
    };
    try {
    // @ts-ignore
      const updatedBooking = await updateBookingUseCase.execute({ idOfExecutingAccount: req.accountId, payload });
      return res.status(200).json(new BookingDTO(updatedBooking));
    } catch (e) {
      next(e);
    }
  } else
    next(new Error(ErrorCode.MISSING_ID));
};
