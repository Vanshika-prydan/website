import LoginUseCase from '../../../../domain/interactors/iam/login';
import { buildLoginController } from './login.controller';
import ControllerTest from '../../../../utilities/controller-test';
import { mockAccount } from '../../../../../mock/account';

describe('Login controller', () => {
  it('should return a 200', async () => {
    const utils = new ControllerTest();
    const loginUseCase = utils.resolveUseCase<LoginUseCase>(mockAccount);
    const controller = buildLoginController({ loginUseCase });
    await controller(utils.request, utils.response, utils.next);

    expect(utils.response.status).toHaveBeenCalledWith(200);
    expect(utils.response.json).toHaveBeenCalled();
    expect(utils.response.cookie).toHaveBeenCalledTimes(2);
  });

  it('should call next if something unexpected goes wrong', async () => {
    const utils = new ControllerTest();
    const loginUseCase = utils.rejectUseCase<LoginUseCase>();
    const controller = buildLoginController({ loginUseCase });
    await controller(utils.request, utils.response, utils.next);

    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
