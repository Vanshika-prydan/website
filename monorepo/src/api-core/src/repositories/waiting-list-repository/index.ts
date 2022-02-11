import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import WaitingListEntity from '../../database/entities/WaitingListEntity';
import { WaitingListEntityInterface } from '../../domain/entities/WaitingListEntity';
import { WaitingListRepositoryInterface } from '../../domain/interface-adapters/repositories/waiting-list-repository';

@injectable()
export default class WaitingListRepository implements WaitingListRepositoryInterface {
  async save (waitingListEntity: WaitingListEntityInterface): Promise<WaitingListEntityInterface> {
    const obj = new WaitingListEntity(waitingListEntity);
    await getRepository(WaitingListEntity).save(obj);
    return obj;
  }
}
