import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IBooking } from '../../../entities/Booking';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { AccountService } from '../../../services/account-service';
import { Setup } from './types';

export class GetAllBookingsUseCase implements IUseCase<undefined, IBooking[]> {
    private readonly bookingRepository: IBookingRepository;
    private readonly accountRepository: IAccountRepository;
    private readonly customerRepository: ICustomerRepository;
    private readonly employeeRepository: IEmployeeRepository;
    constructor (setup:Setup) {
      this.bookingRepository = setup.bookingRepository;
      this.accountRepository = setup.accountRepository;
      this.customerRepository = setup.customerRepository;
      this.employeeRepository = setup.employeeRepository;
    }

    async execute ({ idOfExecutingAccount }: { idOfExecutingAccount: string }): Promise<IBooking[]> {
      const accountHasAccessToAllBookings = await AccountService.loadFromAccountIdAndCheckPermission(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_LIST_ALL_BOOKINGS);
      if (accountHasAccessToAllBookings) return this.bookingRepository.getAll();

      let bookings: IBooking[] = [];
      const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
      if (customer) bookings = [...bookings, ...(await this.bookingRepository.getAll()).filter(b => b.customer.customerId === customer.customerId)];
      const employee = await this.employeeRepository.findByAccountId(idOfExecutingAccount);
      if (employee) bookings = [...bookings, ...(await this.bookingRepository.getAll()).filter(b => b.employee.employeeId === employee.employeeId)];

      if (!customer && !employee) throw new Error(ErrorCode.ACCESS_DENIED);
      return bookings;
    }
}
