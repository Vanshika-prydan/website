export type Day =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface DefaultEmployeeAvailability {
  employeeId: string;
  day: Day;
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
}

export interface DefaultEmployeeAvailabilityCheck {
  employeeId: string;
  day: Day;
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  isCheck?: boolean;
}
