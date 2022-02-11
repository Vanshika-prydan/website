import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import IFrameBookingRepository from '../../../interface-adapters/repositories/frame-booking-repository';
import { AccountService } from '../../../services/account-service';
import { Setup } from './types';
import { FrameBookingFullyDefined } from '../../../entities/FrameBooking/IFrameBooking';

export class GetAllFrameBookingsUseCase implements IUseCase<undefined, FrameBookingFullyDefined[]> {
    private readonly frameBookingRepository: IFrameBookingRepository;
    private readonly accountRepository: IAccountRepository;
    private readonly customerRepository: ICustomerRepository;
    private readonly employeeRepository: IEmployeeRepository;
    constructor (setup:Setup) {
      this.frameBookingRepository = setup.frameBookingRepository;
      this.accountRepository = setup.accountRepository;
      this.customerRepository = setup.customerRepository;
      this.employeeRepository = setup.employeeRepository;
    }

    async execute ({ idOfExecutingAccount }: { idOfExecutingAccount: string }): Promise<FrameBookingFullyDefined[]> {
      const accountHasAccessToAllBookings = await AccountService.loadFromAccountIdAndCheckPermission(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_LIST_ALL_BOOKINGS);
      if (accountHasAccessToAllBookings) return this.frameBookingRepository.getAll();

      const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
      if (!customer) throw new Error('NOT A CUSTOMER');

      return this.frameBookingRepository.findByCustomerId(customer.customerId);

      /*
      let bookings: IFrameBooking[] = [];
      const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
      if (customer) bookings = [...bookings, ...await this.frameBookingRepository.getByCustomerId(customer.customerId)];
      const employee = await this.employeeRepository.findByAccountId(idOfExecutingAccount);
      if (employee) bookings = [...bookings, ...await this.frameBookingRepository.getByEmployeeId(idOfExecutingAccount)];

      if (!customer && !employee) throw new Error(ErrorCode.ACCESS_DENIED);
      return bookings; */
    }
}
