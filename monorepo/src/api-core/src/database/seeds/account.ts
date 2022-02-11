import { Account } from '../entities/Account';
import { getRepository } from 'typeorm';
import { Role } from '../entities/Role';
import AccountService from '../../domain/services/account-service';
import logger from '../../utilities/logging';

if (!process.env.START_USER_PASSWORD) throw new Error('Missing env START_USER_PASSWORD');
if (!process.env.START_USER_USERNAME) throw new Error('Missing env START_USER_USERNAME');

export const setupFirstAccount = async () => {
  if (!await getRepository(Account).findOne({ where: { email: process.env.START_USER_USERNAME } })) {
    logger.info(`No root account exists. Creating root account with email ${process.env.START_USER_USERNAME}. Don't forget to change the password`, 'warn');
    const developerRole = await getRepository(Role).findOneOrFail('DEVELOPER');
    const account = new Account();
    account.email = process.env.START_USER_USERNAME || '';
    account.firstName = 'ROOT';
    account.lastName = 'ROOT';
    account.password = await AccountService.validateAndEncryptPassword(process.env.START_USER_PASSWORD || '');
    account.roles = [developerRole];
    await getRepository(Account).save(account);
  }
};
