import { v4 } from 'uuid';
import { ResetPasswordCodeInterface } from '.';
import { Optional } from '../../../types/optional';
export class ResetPasswordCode implements ResetPasswordCodeInterface {
    id: string;
    accountId: string;
    token: string;
    code: string;
    createdAt: Date;

    constructor (d: Optional<ResetPasswordCodeInterface, 'id'>) {
      this.id = d.id ?? v4();
      this.accountId = d.accountId;
      this.token = d.token;
      this.code = d.code;
      this.createdAt = d.createdAt;
    }
}
