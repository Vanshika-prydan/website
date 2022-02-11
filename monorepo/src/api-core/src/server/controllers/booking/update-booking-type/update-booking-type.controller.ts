import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import { UpdateBookingTypeUseCase } from '../../../../domain/interactors/bookings/update-booking-type/update-booking-type';
import { BookingTypeDTO } from '../../../models/booking-type.model';

export const buildUpdateBookingTypeController = (updateBookingTypeUseCase: UpdateBookingTypeUseCase) => async (req:Request, res:Response, next:NextFunction) => {
  const bookingTypeId = req.params?.bookingTypeId;
  if (bookingTypeId) {
    const payload = {
      bookingTypeId,
      fieldsToUpdate: req.body,
    };
    try {
    // @ts-ignore
      const updatedBooking = await updateBookingTypeUseCase.execute({ idOfExecutingAccount: req.accountId, payload });
      return res.status(200).json(new BookingTypeDTO(updatedBooking));
    } catch (e) {
      next(e);
    }
  } else
    next(new Error(ErrorCode.MISSING_ID));
};
