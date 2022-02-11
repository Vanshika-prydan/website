import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import IFrameBookingRepository from '../../../interface-adapters/repositories/frame-booking-repository';

export interface Setup {
    frameBookingRepository: IFrameBookingRepository;
    accountRepository: IAccountRepository;
    customerRepository: ICustomerRepository;
    employeeRepository: IEmployeeRepository;
}
