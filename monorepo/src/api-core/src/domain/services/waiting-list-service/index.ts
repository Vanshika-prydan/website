import { validateOrReject } from 'class-validator';
import WaitingListEntity, { WaitingListEntityInterface } from '../../entities/WaitingListEntity';
import { ErrorCode } from '../../entities/ErrorCode';

export default class WaitingListService {
  public static async validateWaitingListEntity (waitingListEntity: WaitingListEntityInterface) {
    const obj = new WaitingListEntity(waitingListEntity);
    try {
      await validateOrReject(obj);
    } catch (e) {
      console.log(e);
      throw new Error(ErrorCode.INVALID_INPUT);
    }
  }
}
