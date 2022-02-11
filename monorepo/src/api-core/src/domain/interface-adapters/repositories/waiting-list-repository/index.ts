import { WaitingListEntityInterface } from '../../../entities/WaitingListEntity';

export const WAITING_LIST_REPOSITORY_INTERFACE = 'WaitingListRepositoryInterface';
export interface WaitingListRepositoryInterface {
    save(waitingListEntity:WaitingListEntityInterface):Promise<WaitingListEntityInterface>
}
