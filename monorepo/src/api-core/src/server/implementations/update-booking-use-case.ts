import UpdateBookingUseCase from '../../domain/interactors/bookings/update-booking';
import accountRepository from './account-respository';
import addonRepository from './addon-repository';
import bookingRepository from './booking-repository';
import bookingTypeRepository from './booking-type-repository';
import employeeAvailabilityService from './employee-availability-service';
import employeeRepository from './employee-repository';

const updateBookingUseCase = new UpdateBookingUseCase({ employeeRepository, bookingTypeRepository, employeeAvailabilityService, accountRepository, bookingRepository, addonRepository });

export default updateBookingUseCase;
