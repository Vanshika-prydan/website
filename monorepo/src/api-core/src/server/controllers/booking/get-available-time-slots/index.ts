import { container } from 'tsyringe';
import { GetAvailableTimeSlotsUseCase } from '../../../../domain/interactors/bookings/get-available-time-slots';
import { buildGetAvailableTimeSlotsController } from './get-available-time-slots.controller';

const getAvailableTimeSlots = container.resolve(GetAvailableTimeSlotsUseCase);

const getAvailableTimeSlotsController = buildGetAvailableTimeSlotsController(getAvailableTimeSlots);

export default getAvailableTimeSlotsController;
