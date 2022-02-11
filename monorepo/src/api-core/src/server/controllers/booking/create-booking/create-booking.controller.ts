import { NextFunction, Request, Response } from 'express';
import CreateBookingUseCase from '../../../../domain/interactors/bookings/create-booking';
import { BookingDTO } from '../../../models/booking.model';

export const buildCreateBookingController = (createBookingUseCase: CreateBookingUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
  // @ts-ignore
    const createdBooking = await createBookingUseCase.execute({ payload: req.body, idOfExecutingAccount: req.accountId });
    return res.status(201).json(new BookingDTO(createdBooking));
  } catch (e) {
    next(e);
  }
};
