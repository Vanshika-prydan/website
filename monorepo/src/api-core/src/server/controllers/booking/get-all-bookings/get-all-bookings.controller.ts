import { NextFunction, Request, Response } from 'express';
import { BookingDTO } from '../../../models/booking.model';
import { Setup } from './types';

export const buildGetAllBookingsController = ({ getAllBookingsUseCase }:Setup) => async (req:Request, res: Response, next: NextFunction) => {
  try {
  // @ts-ignore
    const bookings = await getAllBookingsUseCase.execute({ idOfExecutingAccount: req.accountId });
    const response = bookings.map(booking => new BookingDTO(booking));
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
