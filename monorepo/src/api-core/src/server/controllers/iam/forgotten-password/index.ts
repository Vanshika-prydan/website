import { container } from 'tsyringe';
import ForgottenPasswordUseCase from '../../../../domain/interactors/iam/forgotten-password';
import { ACCOUNT_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-repository';
import { RESET_PASSWORD_CODE_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/reset-password-code-repository';
import { EMAIL_PROVIDER_INTERFACE } from '../../../../domain/services/email-service';
import AccountRepository from '../../../../repositories/account-respository';
import ResetPasswordCodeRepository from '../../../../repositories/reset-password-code-repository';
import AWSSes from '../../../../services/email-service/aws-ses';
import buildForgottenPasswordController from './forgotten-password.controller';

container.register(ACCOUNT_REPOSITORY_INTERFACE, { useClass: AccountRepository });
container.register(RESET_PASSWORD_CODE_REPOSITORY_INTERFACE, { useClass: ResetPasswordCodeRepository });
container.register(EMAIL_PROVIDER_INTERFACE, { useClass: AWSSes });

const forgottenPasswordUseCase = container.resolve(ForgottenPasswordUseCase);

const forgottenPasswordController = buildForgottenPasswordController(forgottenPasswordUseCase);

export default forgottenPasswordController;
