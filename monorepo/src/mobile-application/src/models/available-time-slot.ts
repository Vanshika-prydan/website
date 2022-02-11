import { PublicEmployeeModel } from './public-employee.model';

export interface AvailableTimeSlotModel {
  timeSlot: string;
  employees: PublicEmployeeModel[];
}
