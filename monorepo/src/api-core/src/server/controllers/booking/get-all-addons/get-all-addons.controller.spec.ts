import { mockAddon } from '../../../../../mock/addon';
import GetAllAddonsUseCase from '../../../../domain/interactors/bookings/get-all-addons';
import ControllerTest from '../../../../utilities/controller-test';
import AddonDTO from '../../../models/addon.model';
import { buildGetAllAddonsController } from './get-all-addons.controller';

describe('Get all addons controller', () => {
  it('should terutn a list with all addons and 200 status', async () => {
    const utils = new ControllerTest();
    const controller = buildGetAllAddonsController(utils.resolveUseCase<GetAllAddonsUseCase>([mockAddon]));
    await controller(utils.request, utils.response, utils.next);
    expect(utils.response.status).toHaveBeenCalledWith(200);
    expect(utils.response.json).toHaveBeenCalledWith([new AddonDTO(mockAddon)]);
  });

  it('should call next on error', async () => {
    const utils = new ControllerTest();
    const controller = buildGetAllAddonsController(utils.rejectUseCase<GetAllAddonsUseCase>());
    await controller(utils.request, utils.response, utils.next);
    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
