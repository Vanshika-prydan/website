import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import ResetPasswordCode, { ResetPasswordCodeInterface } from '../../entities/ResetPasswordCode';
import { ResetPasswordCodeRepositoryInterface, RESET_PASSWORD_CODE_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/reset-password-code-repository';

const EXPIRE_TIME_IN_MS = 60 * 1000 * 60 * 2;

@injectable()
export default class ResetPasswordService {
  constructor (@inject(RESET_PASSWORD_CODE_REPOSITORY_INTERFACE) private readonly resetPasswordRepo: ResetPasswordCodeRepositoryInterface) { }

  static hasExpired (entity: ResetPasswordCodeInterface):boolean {
    return (entity.createdAt.getTime() + EXPIRE_TIME_IN_MS) <= Date.now();
  }

  public async invalidateAllCodesForAccount (accountId: string):Promise<void> {
    const allEntities = await this.resetPasswordRepo.findByAccountId(accountId);
    const promises:Promise<any>[] = [];

    allEntities.forEach(e => promises.push(this.resetPasswordRepo.remove(e.id)));
    await promises;
  }

  static validateCode (code: string, entity: ResetPasswordCodeInterface): boolean {
    return (code.trim() === entity.code);
  }

  private async getMostRecentEntity (accountId: string):Promise<ResetPasswordCodeInterface | undefined> {
    const resetIntents = await this.resetPasswordRepo.findByAccountId(accountId);
    if (resetIntents.length === 0) return undefined;
    return resetIntents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
  }

  async codeIsValid (code:string, accountId:string):Promise<boolean> {
    const mostRecentCode = await this.getMostRecentEntity(accountId);
    if (!mostRecentCode) return false;
    if (ResetPasswordService.hasExpired(mostRecentCode)) {
      console.log('The code has expired');
      return false;
    }
    return ResetPasswordService.validateCode(code, mostRecentCode);
  }

  private static generateCode ():string {
    const r = () => Math.floor(Math.random() * 10).toString();
    return r() + r() + r() + r() + r() + r() + r() + r();
  }

  async generateNewResetPasswordEntity (accountId: string):Promise<ResetPasswordCodeInterface> {
    await this.invalidateAllCodesForAccount(accountId);
    const entity = new ResetPasswordCode({
      id: v4(),
      accountId,
      code: ResetPasswordService.generateCode(),
      token: v4(),
      createdAt: new Date(),
    });

    await this.resetPasswordRepo.insert(entity);
    return entity;
  }
}
