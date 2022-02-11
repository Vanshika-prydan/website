import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';

export interface Setup {
    bookingRepository: IBookingRepository;
    accountRepository: IAccountRepository;
    customerRepository: ICustomerRepository;
    employeeRepository: IEmployeeRepository;
}
