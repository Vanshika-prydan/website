import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { EmployeeAvailabilityService } from '../../../services/employee-availability-service';

/* export interface AddonEntity {
  addonId: string;
  numberOfUnits: number;
} */
export interface EditableFields {
  // startTime: Date;
  // endTime: Date;
  addressId: string;
  privateNotes: string;
  specialInstructions: string;
  employeeId: string;
  bookingTypeId: string;
   addonIds: string[];
}

export interface UpdateBookingPayload {
  bookingId: string;
  fieldsToUpdate: Partial<EditableFields>;
}
export interface UpdateBookingSetup {
  bookingRepository: IBookingRepository;
  accountRepository: IAccountRepository;
  employeeAvailabilityService: EmployeeAvailabilityService;
  bookingTypeRepository: IBookingTypeRepository;
  employeeRepository: IEmployeeRepository;
  addonRepository: IAddonRepository;
}
