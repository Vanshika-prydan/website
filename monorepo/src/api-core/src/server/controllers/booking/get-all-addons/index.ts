import getAllAddonsUseCase from '../../../implementations/get-all-addons-use-case';
import { buildGetAllAddonsController } from './get-all-addons.controller';

const getAllAddonsController = buildGetAllAddonsController(getAllAddonsUseCase);

export default getAllAddonsController;
