import AppendToWaitingListUseCase from '../../domain/interactors/waiting-list/append-to-waiting-list';
import waitingListRepository from './waiting-list-repository';

const appendToWaitingListUseCase = new AppendToWaitingListUseCase(waitingListRepository);

export default appendToWaitingListUseCase;
