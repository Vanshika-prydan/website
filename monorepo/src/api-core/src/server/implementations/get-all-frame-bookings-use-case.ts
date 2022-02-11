import GetAllFrameBookingsUseCase from '../../domain/interactors/bookings/get-all-frame-bookings';
import accountRepository from './account-respository';
import customerRepository from './customer-repository';
import employeeRepository from './employee-repository';
import frameBookingRepository from './frame-booking-repository';

const getAllFrameBookingsUseCase = new GetAllFrameBookingsUseCase({ accountRepository, customerRepository, employeeRepository, frameBookingRepository });

export default getAllFrameBookingsUseCase;
