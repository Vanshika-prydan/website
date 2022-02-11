import refreshUseCase from '../../../implementations/refresh-use-case';
import { buildJwtRefreshTokenController } from './jwt-refresh-token.controller';

const jwtRefreshTokenController = buildJwtRefreshTokenController(refreshUseCase);

export default jwtRefreshTokenController;
