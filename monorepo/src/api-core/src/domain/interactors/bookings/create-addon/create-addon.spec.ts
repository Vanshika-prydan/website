import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { mockAddon } from '../../../../../mock/addon';
import { CreateAddonUseCase } from './create-addon';
import { CreateAddonUseCaseRequestPayload } from './types';
import { ErrorCode } from '../../../entities/ErrorCode';

describe('Create addon usecase', () => {
  let addonRepository: IAddonRepository;
  let accountRepository: IAccountRepository;
  let payload: CreateAddonUseCaseRequestPayload;
  const idOfExecutingAccount = '7a8b0d8e-8f98-4fb4-b646-f09d7a5393cf';

  beforeEach(() => {
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_CREATE_ADDON);
    addonRepository = { create: jest.fn(() => Promise.resolve(mockAddon)) } as unknown as IAddonRepository;
    payload = {
      name: 'string',
      description: 'ste',
      defaultTimeInMinutes: 100,
    };
  });
  it('should create an addon', async () => {
    const usecase = new CreateAddonUseCase({ accountRepository, addonRepository });
    await expect(usecase.execute({ payload, idOfExecutingAccount })).resolves.toBe(mockAddon);
  });

  it('should throw permission denied on wrong permission', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    const usecase = new CreateAddonUseCase({ accountRepository, addonRepository });
    await expect(usecase.execute({ payload, idOfExecutingAccount })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });

  it('should throw an error if the input is not validated correctly', async () => {
    // @ts-ignore
    payload = { ...payload, defaultTimeInMinutes: -10 };
    const usecase = new CreateAddonUseCase({ accountRepository, addonRepository });
    await expect(usecase.execute({ payload, idOfExecutingAccount })).rejects.toThrowError(ErrorCode.INVALID_INPUT);
  });
});
