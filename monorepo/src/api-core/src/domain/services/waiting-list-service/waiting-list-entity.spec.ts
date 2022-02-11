import WaitingListEntity, { WaitingListEntityInterface } from '../../entities/WaitingListEntity';
import { ErrorCode } from '../../entities/ErrorCode';
import MockWaitingListEntity from '../../entities/WaitingListEntity/mock';
import WaitingListService from '.';

describe('Waiting list entity', () => {
  it('should format the input', () => {
    const payload: WaitingListEntityInterface = {
      waitingListEntityId: '431f5bfb-a5d1-4f14-a2be-991123e5dcea',
      email: '   NIKLAS@cleangreen.se  ',
      postalCode: ' 11443 ',
    };
    const obj = new WaitingListEntity(payload);
    expect(obj.postalCode).toBe('11443');
    expect(obj.email).toBe('niklas@cleangreen.se');
  });

  it('should validate a correct entity', async () => {
    await WaitingListService.validateWaitingListEntity(new MockWaitingListEntity());
  });

  it('should throw if the email is incorrect', async () => {
    await expect(WaitingListService.validateWaitingListEntity(new MockWaitingListEntity({ email: 'hhe' }))).rejects.toThrow(ErrorCode.INVALID_INPUT);
  });
  it('should throw if the postal code is incorrect', async () => {
    await expect(WaitingListService.validateWaitingListEntity(new MockWaitingListEntity({ postalCode: 'ggg' }))).rejects.toThrow(ErrorCode.INVALID_INPUT);
  });
});
