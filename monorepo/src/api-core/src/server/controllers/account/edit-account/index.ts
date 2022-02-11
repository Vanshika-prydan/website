import editAccountUseCase from '../../../implementations/edit-account-use-case';
import { buildEditAccountController } from './edit-account.controller';

const editAccountController = buildEditAccountController(editAccountUseCase);

export default editAccountController;
