import { AddressModel } from '../../../models/address.model';
import { BookingTypeModel } from '../../../models/booking-type.model';
import { BookingModel } from '../../../models/booking.model';
import { EmployeeModel } from '../../../models/employee.model';

export interface EditBookingPresenterProps {
  setIsOpen(isOpen: boolean): void;
  isOpen: boolean;
  booking: BookingModel;
  bookingTypes: BookingTypeModel[];
  bookingType: BookingTypeModel | null;
  setBookingType(type: BookingTypeModel | null): void;
  addresses: AddressModel[];
  address: AddressModel | null;
  setAddress(address: AddressModel | null): void;
  updateBooking(): void;
  employees: EmployeeModel[];
  employee: EmployeeModel | null;
  setEmployee(employee: EmployeeModel | null): void;
  specialInstructions: string;
  setSpecialInstructions(val: string): void;
  close(): void;
  isLoading: boolean;
  errorMessage: string;
  initialEmployee: EmployeeModel;
}

export interface EditBookingProps {
  booking: BookingModel;
  onUpdate?():void;
}
