
import { NextFunction, Request, Response } from 'express';
import AddAddonToBookingUseCase from '../../../../domain/interactors/bookings/add-addon-to-booking';
import { BookingDTO } from '../../../models/booking.model';

const buildAddAddonsToBookingController = (addAddonToBookingUseCase:AddAddonToBookingUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = {
      bookingId: req.params.bookingId,
      addonIds: req.body.addonIds,
    };
    // @ts-ignore
    const updatedbooking = await addAddonToBookingUseCase.execute({ payload, idOfExecutingAccount: req.accountId });
    return res.status(200).json(new BookingDTO(updatedbooking));
  } catch (e) {
    next(e);
  }
};

export default buildAddAddonsToBookingController;
