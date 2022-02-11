import { EmployeeModel } from '../../../models/employee.model';

export interface CreateBookingProps {
  onClose(): void;
  isOpen: boolean;

  startTime?: Date;
  durationInMinutes?: number;
  employee?: EmployeeModel;
}

export type Occurrence = 'weekly' | 'biweekly' | 'fourweekly';
