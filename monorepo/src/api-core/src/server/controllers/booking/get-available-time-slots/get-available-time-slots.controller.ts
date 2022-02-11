import { NextFunction, Request, Response } from 'express';
import { GetAvailableTimeSlotsUseCase } from '../../../../domain/interactors/bookings/get-available-time-slots';
import { AvailableTimeSlotDTO } from '../../../models/available-time-slot.model';

export const buildGetAvailableTimeSlotsController = (usecase: GetAvailableTimeSlotsUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slots = await usecase.execute({ payload: { durationInMinutes: Number(req.params.durationInMinutes), occurrence: req.body.occurrence } });
    const response:AvailableTimeSlotDTO[] = [];
    slots.forEach((employees, timeSlot) => response.push(new AvailableTimeSlotDTO(timeSlot, employees)));
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
