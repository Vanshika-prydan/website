import { NextFunction, Request, Response } from 'express';
import CreateFrameBookingUseCase from '../../../../domain/interactors/bookings/create-frame-booking';
import { FrameBookingDTO } from '../../../models/frame-booking.model';

interface Setup {
    createFrameBookingUseCase: CreateFrameBookingUseCase;
}

export const buildCreateFrameBookingController = ({ createFrameBookingUseCase }:Setup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
  // @ts-ignore
    const createdFrameBooking = await createFrameBookingUseCase.execute({ payload: req.body, idOfExecutingAccount: req.accountId });
    return res.status(201).json(new FrameBookingDTO(createdFrameBooking));
  } catch (e) {
    next(e);
  }
};
