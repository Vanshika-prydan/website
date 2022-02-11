import { CreateAddonUseCase } from '../../domain/interactors/bookings/create-addon/create-addon';
import accountRepository from './account-respository';
import addonRepository from './addon-repository';

const createAddonUseCase = new CreateAddonUseCase({
  accountRepository,
  addonRepository,
});

export default createAddonUseCase;
