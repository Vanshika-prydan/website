import { IAccount } from '../src/domain/entities/Account/IAccount';

export const mockAccount: IAccount = Object.freeze({
  accountId: 'e661d6f1-dec0-46fd-810c-85ae21d9f600',
  dateCreated: new Date('2021-03-18T07:35:09.293Z'),
  dateUpdated: new Date('2021-03-18T07:35:09.293Z'),
  email: 'niklas@cleangreen.se',
  firstName: 'Niklas',
  lastName: 'Johansson',
  password: '$2b$10$buvX2UyUdyFOxu.gQtSHRO83qPGhPgfP1SivCIDH86cMZjtqwwBzS', // thiIsNotMyPass
  phoneNumber: '0704570608',
  roles: [],
});
