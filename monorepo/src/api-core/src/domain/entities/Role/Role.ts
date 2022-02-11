import Permission from '../Permission';
import { IRole } from './IRole';

export class Role implements IRole {
    readonly name: string;
    readonly description: string;
    readonly permissions?: Permission[];

    constructor (values: IRole) {
      this.name = values.name;
      this.description = values.description;
      this.permissions = values.permissions;
    }
}
