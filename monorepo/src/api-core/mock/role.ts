import Permission from '../src/domain/entities/Permission';
import { IRole } from '../src/domain/entities/Role';
export const mockRole:IRole = Object.freeze({
  description: 'Role',
  name: 'ADMINISTRATOR',
  permissions: [Permission.CUSTOMER_ADD_AND_BIND_ADDRESS],
});
