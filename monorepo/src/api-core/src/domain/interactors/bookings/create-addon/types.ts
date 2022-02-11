import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';

export interface Setup {
    addonRepository: IAddonRepository;
    accountRepository: IAccountRepository;
}

export interface CreateAddonUseCaseRequestPayload {
    name: string;
    description: string;
    defaultTimeInMinutes: number;
}
