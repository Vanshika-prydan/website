import { NextFunction, Request, Response } from 'express';
import { FrameBookingDTO } from '../../../models/frame-booking.model';
import { Setup } from './types';

export const buildGetAllFrameBookingsController = ({ getAllFrameBookingsUseCase }:Setup) => async (req:Request, res: Response, next: NextFunction) => {
  try {
  // @ts-ignore
    const frameBookings = await getAllFrameBookingsUseCase.execute({ idOfExecutingAccount: req.accountId });
    const response = frameBookings.map(booking => new FrameBookingDTO(booking));
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
