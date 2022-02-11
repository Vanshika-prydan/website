import { inject, injectable } from 'tsyringe';
import IUseCase from '../../IUseCase';
import WaitingListEntity, { WaitingListEntityInterface } from '../../../entities/WaitingListEntity';
import WaitingListService from '../../../services/waiting-list-service';
import { WaitingListRepositoryInterface, WAITING_LIST_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/waiting-list-repository';

export interface RequestPayload {
    email: string;
    postalCode: string;
}

export type ResponsePayload = WaitingListEntityInterface;

@injectable()
export default class AppendToWaitingListUseCase implements IUseCase<RequestPayload, ResponsePayload> {
  constructor (
      @inject(WAITING_LIST_REPOSITORY_INTERFACE) private readonly waitingListRepository: WaitingListRepositoryInterface,
  ) {}

  async execute ({ payload }: { payload: RequestPayload }): Promise<WaitingListEntityInterface> {
    const obj = new WaitingListEntity(payload);
    await WaitingListService.validateWaitingListEntity(obj);
    return this.waitingListRepository.save(obj);
  }
}
