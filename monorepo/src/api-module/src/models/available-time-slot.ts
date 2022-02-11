import { PublicEmployeeModel } from './public-employee';

export interface AvailableTimeSlotModel {
    timeSlot: string;
    employees: PublicEmployeeModel
}
