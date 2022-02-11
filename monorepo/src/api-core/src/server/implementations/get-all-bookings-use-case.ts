import GetAllBookingsUseCase from '../../domain/interactors/bookings/get-all-bookings';
import accountRepository from './account-respository';
import bookingRepository from './booking-repository';
import customerRepository from './customer-repository';
import employeeRepository from './employee-repository';

const getAllBookingsUseCase = new GetAllBookingsUseCase({ bookingRepository, customerRepository, employeeRepository, accountRepository });

export default getAllBookingsUseCase;
