import { container } from 'tsyringe';
import LoginUseCase from '../../../../domain/interactors/iam/login';
import { buildLoginController } from './login.controller';

export { LoginRequestModel } from './login-request-model';

const loginUseCase = container.resolve(LoginUseCase);
const loginController = buildLoginController({ loginUseCase });

export default loginController;
