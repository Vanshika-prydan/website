import AutoCreateBookingsFromFrameBookingsUseCase from '../../../../domain/interactors/bookings/auto-create-bookings-from-frame-bookings';
import { NextFunction, Request, Response } from 'express';
import { ErrorDTO } from '../../../models/error.model';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';

export const buildAutoCreateBookingsFromFrameBookingsController = (usecase: AutoCreateBookingsFromFrameBookingsUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
  const authKey = 'ko4tkorgTOK%YWEF_T%KH!hjkro%&ÅES#rgklowreGKERO3h';
  try {
    if (req.headers?.authorization !== authKey) return res.status(401).json(new ErrorDTO(new Error(ErrorCode.ACCESS_DENIED)));
    await usecase.execute();
    return res.status(201).json({ message: 'ok' });
  } catch (e) {
    next(e);
  }
};
