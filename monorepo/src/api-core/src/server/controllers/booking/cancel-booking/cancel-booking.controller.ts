import CancelBookingUseCase from '../../../../domain/interactors/bookings/cancel-booking';

import { NextFunction, Request, Response } from 'express';
import { BookingDTO } from '../../../models/booking.model';

const buildCancelBookingController = (cancelBookingUseCase:CancelBookingUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const cancelledBooking = await cancelBookingUseCase.execute({ payload: req.params.bookingId, idOfExecutingAccount: req.accountId });
    return res.status(200).json(new BookingDTO(cancelledBooking));
  } catch (e) {
    next(e);
  }
};

export default buildCancelBookingController;
