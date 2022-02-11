import { NextFunction, Request, Response } from 'express';
import GetAllBookingTypesUseCase from '../../../../domain/interactors/bookings/get-all-booking-types';
import { BookingTypeDTO } from '../../../models/booking-type.model';

interface Setup {
    getAllBookingTypesUseCase: GetAllBookingTypesUseCase;
}

export const buildGetAllBookingTypesController = ({ getAllBookingTypesUseCase }:Setup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingTypes = await getAllBookingTypesUseCase.execute();
    const response = bookingTypes.map(b => new BookingTypeDTO(b));
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
