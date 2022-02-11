import { NextFunction, Request, Response } from 'express';
import { CreateBookingTypeUseCase } from '../../../../domain/interactors/bookings/create-booking-type/create-booking-type';
import { BookingTypeDTO } from '../../../models/booking-type.model';

interface Setup {
    createBookingTypeUseCase: CreateBookingTypeUseCase;
}

export const buildCreateBookingTypeController = ({ createBookingTypeUseCase }:Setup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const bookingTypeResponse = await createBookingTypeUseCase.execute({ payload: req.body, idOfExecutingAccount: req.accountId });
    return res.status(201).json(new BookingTypeDTO(bookingTypeResponse));
  } catch (e) {
    next(e);
  }
};
