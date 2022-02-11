import { ErrorCode } from '../../entities/ErrorCode';
import { IAccount } from '../../entities/Account';
import Permission from '../../entities/Permission';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../interface-adapters/repositories/account-repository';
import { v4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';

import validator from 'validator';
import Personnummer from 'personnummer';
import { upperCaseFirst } from '../../../utilities/upper-case-first';

export const FIRSTNAME_IS_VIOLATED = 'FIRSTNAME_IS_VIOLATED';
export const INVALID_EMAIL = 'INVALID_EMAIL';
export const PASSWORD_IS_VIOLATED = 'PASSWORD_IS_VIOLATED';
export const INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER';
export const ACCOUNT_NOT_ACTIVATED = 'ACCOUNT_NOT_ACTIVATED';
export const WRONG_PASSWORD = 'WRONG_PASSWORD';

@injectable()
export class AccountService {
  constructor (@inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository) {}

  public static async generatePassword ():Promise<{rawPassword:string, encryptedPassword:string}> {
    const rawPassword = v4().substr(0, 16);
    // deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
    const encryptedPassword = await bcrypt.hash(rawPassword, 10);
    return { rawPassword, encryptedPassword };
  }

  public static isAccount (accountOrAccountId:IAccount | string): accountOrAccountId is IAccount {
    return (accountOrAccountId as IAccount).accountId !== undefined;
  }

  public static async loadAccountByIdOrFail (accountRepository: IAccountRepository, accountId:string): Promise<IAccount> {
    const foundAccount = await accountRepository.findById(accountId);
    if (!foundAccount) throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    return foundAccount;
  }

  public async loadAccountByIdOrFail (accountId:string): Promise<IAccount> {
    return AccountService.loadAccountByIdOrFail(this.accountRepository, accountId);
  }

  public static async ensurePresentAccount (accountRepository: IAccountRepository, accountOrAccountId: IAccount|string): Promise<IAccount> {
    if (AccountService.isAccount(accountOrAccountId)) return accountOrAccountId;
    return AccountService.loadAccountByIdOrFail(accountRepository, accountOrAccountId);
  }

  public static async loadAccountAndAuthorize (accountRepository: IAccountRepository, accountId: string, neededPermission: Permission):Promise<IAccount> {
    const account = await AccountService.loadAccountByIdOrFail(accountRepository, accountId);
    AccountService.authorize(account, neededPermission);
    return account;
  }

  public static getPermissionsFromAccount (account:IAccount):Permission[] {
    const permissions:Permission[] = [];
    account.roles?.forEach(role => {
      role.permissions?.forEach(permission => {
        if (!permissions.includes(permission))
          permissions.push(permission);
      });
    });
    return permissions;
  }

  public static accountHasPermission (account: IAccount, permission: Permission): boolean {
    return AccountService.getPermissionsFromAccount(account).includes(permission);
  }

  public static checkPermissionOrFail (account: IAccount, permission: Permission): void {
    if (!AccountService.accountHasPermission(account, permission)) throw new Error(ErrorCode.ACCESS_DENIED);
  }

  public static async loadFromAccountIdAndCheckPermission (accountRepository: IAccountRepository, accointId: string, permission: Permission): Promise<boolean> {
    const account = await accountRepository.findById(accointId);
    if (!account) return false;
    return AccountService.accountHasPermission(account, permission);
  }

  public static authorize (account: IAccount, neededPermission: Permission): void {
    const employeePermissions: Permission[] = [];
    if (!account.roles) throw new Error(ErrorCode.ACCESS_DENIED);
    account.roles.forEach(role => { if (role.permissions) employeePermissions.push(...role.permissions); });
    if (!employeePermissions.find(allPermission => allPermission === neededPermission)) throw new Error(ErrorCode.ACCESS_DENIED);
  }

  static validateAndFormatFirstName (name:string):string {
    const firstName = upperCaseFirst(name.trim().toLowerCase());
    if (!validator.isLength(firstName.trim(), { min: 2, max: 30 })) throw new Error(FIRSTNAME_IS_VIOLATED);
    return firstName;
  }

  static validateAndFormatLastName (name:string): string {
    const lastName = upperCaseFirst(name.trim().toLowerCase());
    if (!validator.isLength(lastName.trim(), { min: 2, max: 100 })) throw new Error(ErrorCode.INVALID_PASSWORD);
    return lastName;
  }

  static validateAndFormatEmail (email:string):string {
    const formattedEmail = email.trim().toLowerCase();
    if (formattedEmail.length > 100) throw new Error(INVALID_EMAIL);
    if (!validator.isEmail(formattedEmail)) throw new Error(INVALID_EMAIL);
    return formattedEmail;
  }

  static async validateAndEncryptPassword (password:string):Promise<string> {
    const pw = password.trim();
    if (pw.length > 255) throw new Error(PASSWORD_IS_VIOLATED);
    if (!validator.isStrongPassword(pw, { minLength: 6, minLowercase: 0, minUppercase: 0, minSymbols: 0 })) throw new Error(PASSWORD_IS_VIOLATED);
    // deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
    return bcrypt.hash(pw, 10);
  }

  static async comparePasswordAndThrowIfWrong (password:string, account: IAccount):Promise<void> {
    if (!account.password) return Promise.reject(new Error(ACCOUNT_NOT_ACTIVATED));
    if (!(await bcrypt.compare(password, account.password)))
      throw new Error(ErrorCode.WRONG_PASSWORD);
  }

  static validateAndFormatPhoneNumber (phonenumber: string): string {
    const formatedNumber = phonenumber.replace(/ /g, '');
    if (!validator.isMobilePhone(formatedNumber, 'sv-SE')) throw new Error(INVALID_PHONE_NUMBER);
    let num: string = formatedNumber;
    if (formatedNumber.substr(0, 2) === '07') num = '+467' + formatedNumber.substr(2);
    if (formatedNumber.substr(0, 5) === '00467') num = '+467' + formatedNumber.substr(5);
    return num;
  }

  static ValidateAndFormatPersonalIdentityNumber (pin: string | undefined): string | undefined {
    if (!pin) return;
    const pn = pin.trim().toLocaleLowerCase();
    if (!Personnummer.valid(pn)) throw new Error(ErrorCode.INVALID_PERSONAL_IDENTITY_NUMBER);
    const p = Personnummer.parse(pn);
    if (p.getAge() < 18) throw new Error(ErrorCode.AGE_RESTRICTION);
    return p.format();
  }

  public async findByEmail (email:string):Promise<IAccount|undefined> {
    const formattedEmail = AccountService.validateAndFormatEmail(email);
    return this.accountRepository.findByEmail(formattedEmail);
  }

  public async findByEmailOrFail (email:string):Promise<IAccount> {
    const account = await this.findByEmail(email);
    if (!account) throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    return account;
  }
}

export default AccountService;
