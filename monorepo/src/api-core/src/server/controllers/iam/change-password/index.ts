import { container } from 'tsyringe';
import ChangePasswordUseCase from '../../../../domain/interactors/iam/change-password';
import { ACCOUNT_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-repository';
import AccountRepository from '../../../../repositories/account-respository';
import buildChangePasswordController from './change-password.controller';

container.register(ACCOUNT_REPOSITORY_INTERFACE, { useClass: AccountRepository });
const changePasswordUseCase = container.resolve(ChangePasswordUseCase);

const changePasswordController = buildChangePasswordController(changePasswordUseCase);

export default changePasswordController;
