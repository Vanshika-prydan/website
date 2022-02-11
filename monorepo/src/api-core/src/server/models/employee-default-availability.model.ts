import { EmployeeDefaultAvailabilityInterface, WeekDayType } from '../../domain/entities/EmployeeDefaultAvailability';

interface EmployeeDefaultAvailabilityModel {
    employeeId: string;
    day: WeekDayType;
    startHour: number;
    startMinute: number;
    endHour:number;
    endMinute:number;
}

export default class EmployeeDefaultAvailabilityDTO implements EmployeeDefaultAvailabilityModel {
    employeeId: string;
    day: WeekDayType;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;

    constructor (payload: EmployeeDefaultAvailabilityInterface) {
      this.employeeId = payload.employeeId;
      this.day = payload.day;
      this.startHour = payload.startHour;
      this.startMinute = payload.startMinute;
      this.endHour = payload.endHour;
      this.endMinute = payload.endMinute;
    }
}
