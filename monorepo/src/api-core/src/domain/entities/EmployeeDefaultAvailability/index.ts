/* eslint-disable no-unused-vars */
import { IEmployee } from '../Employee';

import EmployeeDefaultAvailability from './EmployeeDefaultAvailability';
export { default as EmployeeDefaultAvailability } from './EmployeeDefaultAvailability';
export default EmployeeDefaultAvailability;

export enum WeekDayEnum {
  MONDAY= 'MONDAY',
  TUESDAY='TUESDAY',
  WEDNESDAY= 'WEDNESDAY',
  THURSDAY= 'THURSDAY',
  FRIDAY= 'FRIDAY',
  SATURDAY= 'SATURDAY',
  SUNDAY= 'SUNDAY',
}

export const WeekDay = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
} as const;

export type WeekDayType = typeof WeekDay[keyof typeof WeekDay];

export interface EmployeeDefaultAvailabilityInterface {
  employeeId: string;
  employee?: IEmployee;
  day: WeekDayType;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export interface EmployeeDefaultAvailabilityWithEmployeeInterface extends EmployeeDefaultAvailabilityInterface {
  employee: NonNullable<EmployeeDefaultAvailabilityInterface['employee']>
}
