import { RefreshUseCase } from '../../domain/interactors/iam/refresh/refresh';
import accountRepository from './account-respository';

const refreshUseCase = new RefreshUseCase({
  accountRepository,
});

export default refreshUseCase;
