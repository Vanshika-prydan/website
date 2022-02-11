import GetAllAddonsUseCase from '../../domain/interactors/bookings/get-all-addons';
import addonRepository from './addon-repository';

const getAllAddonsUseCase = new GetAllAddonsUseCase({ addonRepository });

export default getAllAddonsUseCase;
