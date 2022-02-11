import RegisterAccountDeviceUseCase from '.';
import MockAccount from '../../../entities/Account/mock-account';
import AccountNotification from '../../../entities/AccountNotification';
import MockAccountNotification from '../../../entities/AccountNotification/MockAccountNotification';
import { AccountNotificationRepositoryInterface } from '../../../interface-adapters/repositories/account-notifiaction-repository';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';

describe('register-account-device-use-case', () => {
  it('Should call the repository with an object to save ', async () => {
    const resolveValue = new MockAccountNotification();
    const idOfExecutingAccount = '1e40ed75-1377-4ecf-b991-d79565c58576';
    const mockAccount = new MockAccount();
    // @ts-ignore
    const accountNotificationRepository:AccountNotificationRepositoryInterface = {
      save: jest.fn(() => Promise.resolve(resolveValue)),
      findByToken: jest.fn(() => Promise.resolve(undefined)),

    };
    // @ts-ignore
    const accountRepository: IAccountRepository = {
      findById: jest.fn(() => Promise.resolve(mockAccount)),
    };
    const usecase = new RegisterAccountDeviceUseCase(accountNotificationRepository, accountRepository);
    await usecase.execute({ payload: 'token', idOfExecutingAccount });
    expect(accountNotificationRepository.save).toHaveBeenCalledWith(expect.any(AccountNotification));
    expect(accountRepository.findById).toBeCalledWith(idOfExecutingAccount);
  });
});
