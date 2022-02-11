import { PermissionType } from '../definitions/Permissions';
import { CustomerModel } from './customer';

export interface CreateCustomerAndLoginResponseModel {
    permissions: PermissionType[];
    accessToken: string;
    refreshToken: string;
    customer: CustomerModel
}
