import { container } from 'tsyringe';
import ConfirmForgottenPasswordUseCase from '../../../../domain/interactors/iam/confirm-forgotten-password';
import { ACCOUNT_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-repository';
import { RESET_PASSWORD_CODE_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/reset-password-code-repository';
import AccountRepository from '../../../../repositories/account-respository';
import ResetPasswordCodeRepository from '../../../../repositories/reset-password-code-repository';
import buildConfirmForgottenPasswordController from './confirm-forgotten-password.controller';

container.register(ACCOUNT_REPOSITORY_INTERFACE, { useClass: AccountRepository });
container.register(RESET_PASSWORD_CODE_REPOSITORY_INTERFACE, { useClass: ResetPasswordCodeRepository });
const confirmForgottenPasswordUseCase = container.resolve(ConfirmForgottenPasswordUseCase);

const confirmForgottenPasswordController = buildConfirmForgottenPasswordController(confirmForgottenPasswordUseCase);

export default confirmForgottenPasswordController;
