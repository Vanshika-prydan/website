import { RoleModel } from '../../models/role.model';

export interface RoleError {
    errorMessage: string,
    errorCode: string,
    error: string,
}

export interface RoleState {
    roles: RoleModel[];
    isLoading: boolean;
    error?: RoleError;
}
