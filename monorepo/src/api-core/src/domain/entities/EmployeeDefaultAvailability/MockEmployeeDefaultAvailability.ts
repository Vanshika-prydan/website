import { v4 } from 'uuid';
import { EmployeeDefaultAvailability, EmployeeDefaultAvailabilityInterface, WeekDay } from '.';

export default class MockEmployeeDefaultAvailability extends EmployeeDefaultAvailability {
  constructor (values:Partial<EmployeeDefaultAvailabilityInterface> = {}) {
    super({
      day: values.day ?? WeekDay.MONDAY,
      employeeId: values.employeeId ?? v4(),
      endHour: values.endHour ?? 17,
      endMinute: values.endMinute,
      startHour: values.startHour ?? 7,
      startMinute: values.startMinute,
    });
  }
}
