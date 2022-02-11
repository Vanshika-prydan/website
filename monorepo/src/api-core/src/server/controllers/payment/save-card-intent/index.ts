import saveCardIntentUseCase from '../../../implementations/save-card-intent-use-case';
import SaveCardIntentController from './save-card-intent.controller';

const controller = SaveCardIntentController(saveCardIntentUseCase);

const saveCardIntentController = controller;

export default saveCardIntentController;
