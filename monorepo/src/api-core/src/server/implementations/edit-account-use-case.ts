import { container } from 'tsyringe';
import EditAccountUseCase from '../../domain/interactors/acccount/edit-account';

const editAccountUseCase = container.resolve(EditAccountUseCase);

export default editAccountUseCase;
