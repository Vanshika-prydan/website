import getAllRolesUseCase from '../../../../implementations/get-all-roles-use-case';
import { buildGetAllRolesController } from './get-all-roles-controller';

const getAllRolesController = buildGetAllRolesController({ getAllRolesUseCase });

export default getAllRolesController;
