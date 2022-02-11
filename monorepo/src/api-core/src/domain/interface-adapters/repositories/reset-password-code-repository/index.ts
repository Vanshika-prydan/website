import { ResetPasswordCodeInterface } from '../../../entities/ResetPasswordCode';

export const RESET_PASSWORD_CODE_REPOSITORY_INTERFACE = 'ResetPasswordCodeRepositoryInterface';

export interface ResetPasswordCodeRepositoryInterface {
    remove(id: string): Promise<void>;
    insert(entity: ResetPasswordCodeInterface): Promise<void>;
    findByAccountId(accountId:string): Promise<ResetPasswordCodeInterface[]>
}
