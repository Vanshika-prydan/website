import Permission from '../Permission';

export interface IRole {
    name: string,
    permissions?: Permission[],
    description: string,
}
