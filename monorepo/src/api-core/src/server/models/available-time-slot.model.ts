import { IEmployee } from '../../domain/entities/Employee';
import { PublicEmployeeDTO } from './public-employee.model';

export interface AvailableTimeSlot {
    timeSlot: Date | string;
    employees: PublicEmployeeDTO[]
}

export class AvailableTimeSlotDTO implements AvailableTimeSlot {
    timeSlot: string | Date;
    employees: PublicEmployeeDTO[];

    constructor (timeSlot: string | Date, employees: IEmployee[]) {
      this.timeSlot = new Date(timeSlot);
      this.employees = employees.map(e => new PublicEmployeeDTO(e));
    }
}
