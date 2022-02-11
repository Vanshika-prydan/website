import createBookingTypeUseCase from '../../../implementations/create-booking-type-use-case';
import { buildCreateBookingTypeController } from './create-booking-type.controller';

export { CreateBookingTypeModel } from './create-booking-type-model';

const createBookingTypeController = buildCreateBookingTypeController({ createBookingTypeUseCase });
export default createBookingTypeController;
