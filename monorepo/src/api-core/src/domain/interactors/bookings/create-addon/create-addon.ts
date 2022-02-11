import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAddon } from '../../../entities/Addon';
import { AddonService } from '../../../services/booking/addon-service';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { CreateAddonRequestPayload } from '../../../interface-adapters/repositories/addon-repository/create-addon-request-payload';
import { AccountService } from '../../../services/account-service';
import { Setup, CreateAddonUseCaseRequestPayload } from './types';

export class CreateAddonUseCase implements IUseCase<CreateAddonUseCaseRequestPayload, IAddon> {
    private readonly addonRepository: IAddonRepository;
    private readonly accountRepository: IAccountRepository;

    constructor ({ accountRepository, addonRepository }:Setup) {
      this.addonRepository = addonRepository;
      this.accountRepository = accountRepository;
    }

    validateAndFormatInput (payload: CreateAddonUseCaseRequestPayload):CreateAddonRequestPayload {
      return {
        defaultTimeInMinutes: AddonService.validateAndReturnDefaultTimeInMinutes(payload.defaultTimeInMinutes),
        description: AddonService.validateAndFormatDescription(payload.description),
        name: AddonService.validateAndFormatName(payload.name),
        unit: 'min',
      };
    }

    async execute ({ payload, idOfExecutingAccount }: { payload: CreateAddonUseCaseRequestPayload; idOfExecutingAccount: string }): Promise<IAddon> {
      await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_CREATE_ADDON);
      const validatedInput = this.validateAndFormatInput(payload);
      return this.addonRepository.create(validatedInput);
    }
}
