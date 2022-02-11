import { CustomerModel } from './customer.model';
import { PermissionType } from './Permissions';

export interface CreateCustomerAndLoginResponseModel {
  permissions: PermissionType[];
  accessToken: string;
  refreshToken: string;
  customer: CustomerModel;
}
