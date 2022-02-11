import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import EditFrameBookingUseCase from '../../../../domain/interactors/bookings/edit-frame-booking';
import { FrameBookingDTO } from '../../../models/frame-booking.model';

export const buildEditFrameBookingController = (usecase: EditFrameBookingUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  const frameBookingId = req.params?.frameBookingId;
  if (frameBookingId) {
    const payload = {
      frameBookingId,
      employeeId: req.body.employeeId,
    };
    try {
      // @ts-ignore
      const updatedBooking = await usecase.execute({ idOfExecutingAccount: req.accountId, payload });
      return res.status(200).json(new FrameBookingDTO(updatedBooking));
    } catch (e) {
      next(e);
    }
  } else
    next(new Error(ErrorCode.MISSING_ID));
};
