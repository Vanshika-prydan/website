import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import DeleteBookingUseCaase from '../../../../domain/interactors/bookings/delete-booking';

export const buildDeleteBookingController = (deleteBooking: DeleteBookingUseCaase) => async (req:Request, res: Response, next: NextFunction) => {
  const bookingId = req.params?.bookingId;
  try {
    if (!bookingId) throw new Error(ErrorCode.INVALID_INPUT);
    // @ts-ignore
    await deleteBooking.execute({ idOfExecutingAccount: req.accountId, payload: bookingId });
    return res.status(200).json({ message: 'ok' });
  } catch (e) {
    next(e);
  }
};
