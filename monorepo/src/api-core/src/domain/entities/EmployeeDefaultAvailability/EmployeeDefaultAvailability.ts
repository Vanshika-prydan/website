import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { WeekDayType, EmployeeDefaultAvailabilityInterface } from '.';
import Employee from '../Employee';

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export default class EmployeeDefaultAvailability implements EmployeeDefaultAvailabilityInterface {
  @IsUUID('4')
  employeeId: string;

  employee?: Employee;

  day!: WeekDayType;

  @IsInt()
  @Min(0)
  @Max(23)
  startHour!: number;

  @IsInt()
  @Min(0)
  @Max(59)
  startMinute!: number;

  @IsInt()
  @Min(0)
  @Max(23)
  endHour!: number;

  @IsInt()
  @Min(0)
  @Max(59)
  endMinute!: number;

  constructor (payload:MakeOptional<EmployeeDefaultAvailabilityInterface, 'startMinute' | 'endMinute'>) {
    this.employeeId = payload.employeeId;
    this.employee = payload.employee ? new Employee(payload.employee) : undefined;
    this.day = payload.day;
    this.startHour = payload.startHour;
    this.startMinute = payload.startMinute ?? 0;
    this.endHour = payload.endHour;
    this.endMinute = payload.endMinute ?? 0;
  }
}
