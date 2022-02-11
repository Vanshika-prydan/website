import { NextFunction, Request, Response } from 'express';
import ChargeUnpaidBookingsUseCase from '../../../../domain/interactors/services/charge-unpayed-bookings';

const buildChargeUnpaidBookingsController = (chargeCardFallbackFacade: ChargeUnpaidBookingsUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  try {
    await chargeCardFallbackFacade.execute();
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    next(e);
  }
};

export default buildChargeUnpaidBookingsController;
