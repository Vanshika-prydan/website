import { container } from 'tsyringe';
import AddAddonToBookingUseCase from '../../../../domain/interactors/bookings/add-addon-to-booking';
import { ADDON_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/addon-repository';
import { BOOKING_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/booking-repository';
import AddonRepository from '../../../../repositories/addon-repository';
import { BookingRepository } from '../../../../repositories/booking-repository/booking-repository';
import buildAddAddonsToBookingController from './controller';

container.register(BOOKING_REPOSITORY_INTERFACE, { useClass: BookingRepository }).register(ADDON_REPOSITORY_INTERFACE, { useClass: AddonRepository });
const addAddonToBookingUseCase = container.resolve(AddAddonToBookingUseCase);
const addAddonsToBookingController = buildAddAddonsToBookingController(addAddonToBookingUseCase);

export default addAddonsToBookingController;
export { default as AddAddonsToBookingRequestModel } from './request-model';
