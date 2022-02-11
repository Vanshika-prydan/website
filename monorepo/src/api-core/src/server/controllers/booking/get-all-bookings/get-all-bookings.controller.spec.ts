import { mockBooking } from '../../../../../mock/booking';
import GetAllBookingsUseCase from '../../../../domain/interactors/bookings/get-all-bookings';
import ControllerTest from '../../../../utilities/controller-test';
import { BookingDTO } from '../../../models/booking.model';
import { buildGetAllBookingsController } from './get-all-bookings.controller';

describe('GetAllBookingController', () => {
  it('should return 200 and a list of bookings', async () => {
    const utils = new ControllerTest();
    const getAllBookingsUseCase = utils.resolveUseCase<GetAllBookingsUseCase>([mockBooking]);
    const controller = buildGetAllBookingsController({ getAllBookingsUseCase });
    await controller(utils.request, utils.response, utils.next);

    expect(utils.response.status).toHaveBeenCalledWith(200);
    expect(utils.response.json).toHaveBeenCalledWith([new BookingDTO(mockBooking)]);
  });
  it('should return 200 and an empty list', async () => {
    const utils = new ControllerTest();
    const getAllBookingsUseCase = utils.resolveUseCase<GetAllBookingsUseCase>([]);
    const controller = buildGetAllBookingsController({ getAllBookingsUseCase });
    await controller(utils.request, utils.response, utils.next);

    expect(utils.response.status).toHaveBeenCalledWith(200);
    expect(utils.response.json).toHaveBeenCalledWith([]);
  });

  it('should call next on error', async () => {
    const utils = new ControllerTest();
    const getAllBookingsUseCase = utils.rejectUseCase<GetAllBookingsUseCase>();
    const controller = buildGetAllBookingsController({ getAllBookingsUseCase });
    await controller(utils.request, utils.response, utils.next);
    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
