import { CustomerModel } from '../../models/customer.model';

export interface CustomerState {
    customers: CustomerModel[];
    isLoading: boolean;
}
