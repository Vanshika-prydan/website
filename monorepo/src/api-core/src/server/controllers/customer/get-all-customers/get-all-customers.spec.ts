import { ICustomer } from '../../../../domain/entities/Customer';
import GetAllCustomersUseCase from '../../../../domain/interactors/customer/get-all-customers';
import { buildGetAllCosumersController } from './get-all-customers';
import { mockCustomer } from '../../.././../../mock/customer';
import ControllerTest from '../../../../utilities/controller-test';

describe('Get all customers controller', () => {
  const customers: ICustomer[] = [mockCustomer];

  it('should return 200 with all customers', async () => {
    const utils = new ControllerTest();
    const getAllCustomersUseCase = utils.resolveUseCase<GetAllCustomersUseCase>(customers);
    const getAllCosumersController = buildGetAllCosumersController({ getAllCustomersUseCase });

    await getAllCosumersController(utils.request, utils.response, utils.next);

    expect(getAllCustomersUseCase.execute).toHaveBeenCalledWith({ idOfExecutingAccount: 'uuid' });
    expect(utils.response.status).toHaveBeenCalledWith(200);
    expect(utils.response.json).toHaveBeenCalled();
  });
  it('should call next on error', async () => {
    const utils = new ControllerTest();
    const getAllCustomersUseCase = utils.rejectUseCase<GetAllCustomersUseCase>();
    const getAllCosumersController = buildGetAllCosumersController({ getAllCustomersUseCase });

    await getAllCosumersController(utils.request, utils.response, utils.next);
    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
