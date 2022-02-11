import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import BookingService from '../../../services/booking-service';

export interface AddAddonEntity {
  addonId: string;
  numberOfUnits: number;
}
export interface CreateBookingPayload {
  customerId?: string;
  frameBookingId?: string;
  startTime: string;
  durationInMinutes: number;
  addressId: string;
  privateNotes?: string;
  specialInstructions?: string;
  bookingTypeId: string;
  employeeId: string;
  bookingAddons?: AddAddonEntity[];
}

export interface Setup {
  accountRepository: IAccountRepository;
  customerRepository: ICustomerRepository;
  bookingService: BookingService;
}
