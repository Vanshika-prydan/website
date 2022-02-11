
import { ResetPasswordCode } from './ResetPasswordCode';

export interface ResetPasswordCodeInterface {
    id:string;
    accountId: string;
    token: string;
    code: string;
    createdAt: Date;
}
export default ResetPasswordCode;
