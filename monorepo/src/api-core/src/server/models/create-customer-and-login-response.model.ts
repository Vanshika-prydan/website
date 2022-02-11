import Permission from '../../domain/entities/Permission';
import { CustomerModel } from './customer.model';

export interface CreateCustomerAndLoginResponseModel {
    permissions: Permission[];
    accessToken: string;
    refreshToken: string;
    customer: CustomerModel
}
