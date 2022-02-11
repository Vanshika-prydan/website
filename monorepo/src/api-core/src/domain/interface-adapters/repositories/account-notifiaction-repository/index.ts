import { IAccountNotification } from '../../../entities/AccountNotification';
import { BaseRepositoryInterface } from '../base-repository';

export const ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE = 'AccountNotificationRepositoryInterface';
export interface AccountNotificationRepositoryInterface extends BaseRepositoryInterface<IAccountNotification>{
    fetchByAccount (accountId: string):Promise<IAccountNotification[]>;
    findByToken(token: string):Promise<IAccountNotification | undefined>;
}
