
import { Role } from '../entities/Role';
import PermissionEnum from '../../domain/entities/Permission';
import logger from '../../utilities/logging';
import { Permission } from '../entities/Permission';
import { getRepository } from 'typeorm';

export const setupRoles = async () => {
  logger.info('Updating roles DEVELOPER, ADMINISTRATOR, EMPLOYEE and CUSTOMER with the correct permissions');

  const developer = new Role();
  developer.name = 'DEVELOPER';
  developer.description = 'The developer has access to all recources';
  developer.permissionRelations = Object.values(PermissionEnum).map(k => new Permission(PermissionEnum[k]));
  await getRepository(Role).save(developer);

  const administrator = new Role();
  administrator.name = 'ADMINISTRATOR';
  administrator.description = 'The administrator has access to all recources';
  administrator.permissionRelations = Object.values(PermissionEnum).map(k => new Permission(PermissionEnum[k]));
  await getRepository(Role).save(administrator);

  const employee = new Role();
  employee.name = 'EMPLOYEE';
  employee.description = 'The employee has access to the back office';
  employee.permissionRelations = [new Permission(PermissionEnum.ACCESS_TO_BACK_OFFICE), new Permission(PermissionEnum.CUSTOMER_LIST_ALL), new Permission(PermissionEnum.BOOKING_MARK_AS_COMPLETED)];
  await getRepository(Role).save(employee);

  const customer = new Role();
  customer.name = 'CUSTOMER';
  customer.description = 'The customer has a customer account';
  customer.permissionRelations = [];
  await getRepository(Role).save(customer);
};
