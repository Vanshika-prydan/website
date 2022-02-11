import { addHours } from 'date-fns';
import { ResetPasswordCodeInterface } from '.';

export default class MockResetPasswordCode implements ResetPasswordCodeInterface {
    id: string;
    accountId: string;
    token: string;
    code: string;
    createdAt: Date;

    constructor (d: Partial<ResetPasswordCodeInterface> = {}) {
      this.id = d.id ?? '968d7410-f335-4789-9fec-270df8f7e80f';
      this.accountId = d.accountId ?? '6a531648-b898-44d0-bfe9-10be80a626f6';
      this.token = d.token ?? '8e02371a-7bce-411c-942c-c978bea7aa0f';
      this.code = d.code ?? '12345678';
      this.createdAt = d.createdAt ?? addHours(new Date(), -1);
    }
}
