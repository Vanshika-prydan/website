import { setupFirstAccount } from './account';
import { setupBookingTypes } from './booking-types';
import { setupPermissions } from './permissions';
import { setupRoles } from './roles';

export const setupDatabase = async () => {
  console.log('SETTING UP PERMISSIONS');
  await setupPermissions();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('SETTING UP ROLES');
  await setupRoles();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('SETTING UP FIRST ACCOUNT');
  await setupFirstAccount();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('SETTING UP BOOKING TYPES');
  await setupBookingTypes();
};
