import { NextFunction, Request, Response } from 'express';
import CancelFrameBookingUseCase from '../../../../domain/interactors/bookings/cancel-frame-booking';

interface Setup {
  cancelFrameBookingUseCase: CancelFrameBookingUseCase;
}
export const buildCancelFrameBookingController = ({ cancelFrameBookingUseCase }:Setup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
  // @ts-ignore
    await cancelFrameBookingUseCase.execute({ payload: req.params.frameBookingId, idOfExecutingAccount: req.accountId });
    return res.status(200).json({ message: 'success' });
  } catch (e) {
    next(e);
  }
};
