import createAddonUseCase from '../../../implementations/create-addon-use-case';
import { buildCreateAddonController } from './create-addon.controller';
export { CreateAddonRequestModel } from './create-addon-request.model';

const createAddonController = buildCreateAddonController({ createAddonUseCase });

export default createAddonController;
