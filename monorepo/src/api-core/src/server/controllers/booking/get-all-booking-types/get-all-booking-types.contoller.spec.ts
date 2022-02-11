import { mockBookingType } from '../../../../../mock/booking-type';
import GetAllBookingTypesUseCase from '../../../../domain/interactors/bookings/get-all-booking-types';
import ControllerTest from '../../../../utilities/controller-test';
import { BookingTypeDTO } from '../../../models/booking-type.model';
import { buildGetAllBookingTypesController } from './get-all-booking-types.contoller';

describe('Get all booking types controller', () => {
  it('should send a 200 response and a list of booking types', async () => {
    const utils = new ControllerTest();
    const setup = {
      getAllBookingTypesUseCase: utils.resolveUseCase<GetAllBookingTypesUseCase>([mockBookingType]),
    };
    const controller = buildGetAllBookingTypesController(setup);
    await controller(utils.request, utils.response, utils.next);

    expect(utils.response.status).toHaveBeenCalledWith(200);
    expect(utils.response.json).toHaveBeenCalledWith([new BookingTypeDTO(mockBookingType)]);
  });
  it('should  call next on error', async () => {
    const utils = new ControllerTest();
    const setup = {
      getAllBookingTypesUseCase: utils.rejectUseCase<GetAllBookingTypesUseCase>(),
    };
    const controller = buildGetAllBookingTypesController(setup);
    await controller(utils.request, utils.response, utils.next);

    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
