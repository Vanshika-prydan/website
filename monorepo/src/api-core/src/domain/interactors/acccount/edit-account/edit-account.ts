import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccount } from '../../../entities/Account';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { AccountService } from '../../../services/account-service';
import { EditAccountRequestPayload } from './types';

@injectable()
export class EditAccountUseCase implements IUseCase<EditAccountRequestPayload, IAccount> {
  constructor (
    @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
    private readonly accountService: AccountService,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: EditAccountRequestPayload; idOfExecutingAccount: string }): Promise<IAccount> {
    const account = await this.accountService.loadAccountByIdOrFail(payload.accountId);

    if (idOfExecutingAccount !== account.accountId) {
      const executingAccount = await this.accountService.loadAccountByIdOrFail(idOfExecutingAccount);
      AccountService.checkPermissionOrFail(executingAccount, Permission.ACCOUNT_EDIT);
    }

    if (payload.fieldsToUpdate.roles)
      if (!AccountService.accountHasPermission(account, Permission.ACCOUNT_EDIT_ROLES)) throw new Error(ErrorCode.ACCESS_DENIED);

    const updatedAccount = { ...account };

    const { firstName, lastName, phoneNumber } = payload.fieldsToUpdate;
    if (firstName) updatedAccount.firstName = AccountService.validateAndFormatFirstName(firstName);
    if (lastName) updatedAccount.lastName = AccountService.validateAndFormatLastName(lastName);
    if (phoneNumber) updatedAccount.phoneNumber = AccountService.validateAndFormatPhoneNumber(phoneNumber);

    return this.accountRepository.update(updatedAccount);
  }
}
