import AppendToWaitingListUseCase, { RequestPayload } from '.';
import { ErrorCode } from '../../../entities/ErrorCode';
import WaitingListEntity, { MockWaitingListEntity } from '../../../entities/WaitingListEntity';
import { WaitingListRepositoryInterface } from '../../../interface-adapters/repositories/waiting-list-repository';

describe('Append to waiting list use case', () => {
  let usecase: AppendToWaitingListUseCase;

  let waitingListRepository: WaitingListRepositoryInterface;

  const responseValue = new MockWaitingListEntity();
  beforeEach(() => {
    waitingListRepository = { save: jest.fn(() => Promise.resolve(responseValue)) } as unknown as WaitingListRepositoryInterface;

    usecase = new AppendToWaitingListUseCase(waitingListRepository);
  });
  const payload:RequestPayload = { email: 'niklas@sluh.se', postalCode: '11885' };
  it('should save an waiting list entity in the database', async () => {
    await usecase.execute({ payload });
    expect(waitingListRepository.save).toHaveBeenCalledWith(expect.any(WaitingListEntity));
  });

  it('should validate the object and throw an error if the object is incorrect', async () => {
    await expect(usecase.execute({ payload: { ...payload, email: 'ggg' } })).rejects.toThrowError(ErrorCode.INVALID_INPUT);
  });
});
