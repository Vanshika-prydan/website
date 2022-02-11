import { getRepository } from 'typeorm';
import PermissionEnum from '../../domain/entities/Permission';
import logger from '../../utilities/logging';
import { Permission } from '../entities/Permission';

export const setupPermissions = async () => {
  const allPermissions = Object.values(PermissionEnum);

  const allPromises:Promise<any>[] = [];

  await allPermissions.forEach(async permission => {
    const permissionExists = await getRepository(Permission).findOne(permission);
    if (!permissionExists) {
      logger.info(`Adding permission ${permission} to the database`);
      const p = new Permission(permission);
      allPromises.push(getRepository(Permission).save(p));
    }
  });
  return Promise.all(allPromises);
};
