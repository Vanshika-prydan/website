import { getRepository } from 'typeorm';
import { ResetPasswordCode } from '../../database/entities/ResetPasswordCode';
import { ResetPasswordCodeInterface } from '../../domain/entities/ResetPasswordCode';
import { ResetPasswordCodeRepositoryInterface } from '../../domain/interface-adapters/repositories/reset-password-code-repository';

export default class ResetPasswordCodeRepository implements ResetPasswordCodeRepositoryInterface {
  async remove (id: string): Promise<void> {
    await getRepository(ResetPasswordCode).delete({ id });
  }

  async insert (entity: ResetPasswordCodeInterface): Promise<void> {
    const e = new ResetPasswordCode(entity);
    await getRepository(ResetPasswordCode).save(e);
  }

  findByAccountId (accountId: string): Promise<ResetPasswordCodeInterface[]> {
    return getRepository(ResetPasswordCode).find({ where: { accountId } });
  }
}
