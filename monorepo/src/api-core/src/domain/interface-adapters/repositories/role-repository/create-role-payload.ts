import Permission from '../../../entities/Permission';

export interface ICreateRolePayload {
    description: string;
    name : string;
    permissions: Permission[];
}
