import validator from 'validator';
import { IRole } from '../../domain/entities/Role';

export interface RoleModel {
    name: string,
    permissions?: string[],
    description?: string | null,
}
export class RoleDTO implements RoleModel {
    name: string;
    permissions?: string[] ;
    description?: string | null ;

    constructor ({
      name,
      permissions,
      description,
    }:IRole) {
      this.name = validator.escape(name);
      this.permissions = permissions;
      this.description = validator.escape(description);
    }
}
