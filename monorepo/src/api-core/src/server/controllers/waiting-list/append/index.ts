import appendToWaitingListUseCase from '../../../implementations/append-to-waiting-list-use-case';
import buildAppendToWaitingListController from './append-to-waiting-list.controller';

const appendToWaitingListController = buildAppendToWaitingListController(appendToWaitingListUseCase);

export default appendToWaitingListController;
