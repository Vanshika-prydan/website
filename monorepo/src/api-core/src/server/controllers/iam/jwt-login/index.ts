import { container } from 'tsyringe';
import LoginUseCase from '../../../../domain/interactors/iam/login';
import { buildJwtLoginController } from './jwt-login.controller';

export { JWTLoginRequestModel } from './jwt-login-request-model';

const loginUseCase = container.resolve(LoginUseCase);
const jwtLoginController = buildJwtLoginController({ loginUseCase });

export default jwtLoginController;
