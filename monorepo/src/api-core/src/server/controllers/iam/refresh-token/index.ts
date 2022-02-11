import refreshUseCase from '../../../implementations/refresh-use-case';
import { buildRefreshTokenController } from './refresh-token.controller';

const refreshTokenController = buildRefreshTokenController(refreshUseCase);

export default refreshTokenController;
