import { mockAccount } from '../../../../mock/account';
import { ErrorCode } from '../../entities/ErrorCode';
import { IRole } from '../../entities/Role';
import { ACCOUNT_NOT_ACTIVATED, FIRSTNAME_IS_VIOLATED, INVALID_EMAIL, INVALID_PHONE_NUMBER, PASSWORD_IS_VIOLATED } from './';
import AccountService from '.';
import Account from '../../entities/Account';

describe('Account entity', () => {
  it('Should be possible set all fields', () => {
    const stubRoles = [] as unknown as IRole[];
    const date = new Date();
    const values = {
      accountId: 'uuid',
      firstName: 'Förstanamn',
      lastName: 'Efternamn',
      email: 'correct@email.com',
      password: 'encryptedPassword',
      roles: stubRoles,
      phoneNumber: '0701232233',
      dateCreated: date,
      dateUpdated: date,
    };
    const { accountId, firstName, lastName, email, password, phoneNumber, dateCreated, dateUpdated, roles } = new Account(values);

    expect(accountId).toBe('uuid');
    expect(firstName).toBe('Förstanamn');
    expect(lastName).toBe('Efternamn');
    expect(email).toBe('correct@email.com');
    expect(password).toBe('encryptedPassword');
    expect(phoneNumber).toBe('0701232233');
    expect(roles).toStrictEqual(stubRoles);

    expect(dateCreated).toStrictEqual(date);
    expect(dateUpdated).toStrictEqual(date);
  });

  describe('Firstname', () => {
    it('should return a correct name from a correct name', () => {
      expect(AccountService.validateAndFormatFirstName('Niklas')).toBe('Niklas');
    });
    it('should return a correctly formarted name when caps and spaces are present', () => {
      expect(AccountService.validateAndFormatFirstName('   NIKLAS ')).toBe('Niklas');
    });
    it('should throw an error when the firstname is empty', () => {
      expect(() => AccountService.validateAndFormatFirstName('')).toThrow(FIRSTNAME_IS_VIOLATED);
    });
    it('should throw an error when the firstname is longer than 30 chars', () => {
      expect(() => AccountService.validateAndFormatFirstName('1234567890123456789012345678900')).toThrow(FIRSTNAME_IS_VIOLATED);
    });
  });

  describe('Lastname', () => {
    it('should return a correct name from a correct name', () => {
      expect(AccountService.validateAndFormatLastName('Ek')).toBe('Ek');
    });
    it('should return a correctly formarted name when caps and spaces are present', () => {
      expect(AccountService.validateAndFormatLastName('   JOHANSSON ')).toBe('Johansson');
    });
    it('should throw an error when the firstname is empty', () => {
      expect(() => AccountService.validateAndFormatLastName('')).toThrow(ErrorCode.INVALID_PASSWORD);
    });
    it('should throw an error when the firstname is longer than 100 chars', () => {
      expect(() => AccountService.validateAndFormatLastName('iatyhkajcgqvvdcjapgwezlssoxxvuwlcfvpclnlxogliismmftcykioovtqieiwrcnjoeskxpufpworqulvruuedmtjzyrfydccx')).toThrow(ErrorCode.INVALID_PASSWORD);
    });
  });

  describe('Email', () => {
    it('should return a valid email', () => {
      expect(AccountService.validateAndFormatEmail('valid@email.se')).toBe('valid@email.se');
    });
    it('should return a valid and correctly formated email', () => {
      expect(AccountService.validateAndFormatEmail(' valid@email.SE   ')).toBe('valid@email.se');
    });
    it('should throw when the email is unvalid, ', () => {
      expect(() => AccountService.validateAndFormatEmail('valid@ff@email.se')).toThrow(INVALID_EMAIL);
    });
  });

  describe('Password', () => {
    it('should generate hanged password when the password is strong', async () => {
      await expect(AccountService.validateAndEncryptPassword('strong:Password123')).resolves.toBeTruthy();
    });
    it('should throw an error if the password is weak or empty', async () => {
      await expect(AccountService.validateAndEncryptPassword('')).rejects.toThrow(PASSWORD_IS_VIOLATED);
    });
    it('Should return an error if the account is not activated (undefined password)', async () => {
      const mockAcc = { ...mockAccount, password: undefined };
      await expect(AccountService.comparePasswordAndThrowIfWrong('pass', mockAcc)).rejects.toThrowError(ACCOUNT_NOT_ACTIVATED);
    });
    it('Should resolve if the pass is the same', async () => {
      await expect(AccountService.comparePasswordAndThrowIfWrong('thiIsNotMyPass', mockAccount)).resolves.toBe(undefined);
    });
    it('Should throw an error if the password is wrong', async () => {
      await expect(AccountService.comparePasswordAndThrowIfWrong('wrongPass', mockAccount)).rejects.toThrowError(ErrorCode.WRONG_PASSWORD);
    });
  });

  describe('Phonenumber', () => {
    it('Should validate a correct phone number', () => {
      expect(AccountService.validateAndFormatPhoneNumber('0701231122')).toBe('+46701231122');
    });
    it('Should validate a correct phone number with +46 in the beginning', () => {
      expect(AccountService.validateAndFormatPhoneNumber('+46701231122')).toBe('+46701231122');
    });
    /* it('Should validate a correct phone number with 0046 in the beginning', () => {
      expect(Account.validateAndFormatPhoneNumber('0046701231122')).toBe('+46701231122');
    }); */
    it('Should replace all blank spaces', () => {
      expect(AccountService.validateAndFormatPhoneNumber('  070  1 2 31122    ')).toBe('+46701231122');
    });
    it('Should ', () => {
      expect(() => AccountService.validateAndFormatPhoneNumber(' kk 070  1 2 31122    ')).toThrow(INVALID_PHONE_NUMBER);
    });
  });

  describe('Personal identity number', () => {
    it('should validate the personal number, long', () => {
      expect(AccountService.ValidateAndFormatPersonalIdentityNumber('19810403-2647')).toBe('810403-2647');
    });
    it('should validate the personal number, short', () => {
      expect(AccountService.ValidateAndFormatPersonalIdentityNumber('810403-2647')).toBe('810403-2647');
    });
    it('should validate the personal number, without dash', () => {
      expect(AccountService.ValidateAndFormatPersonalIdentityNumber('198104032647')).toBe('810403-2647');
    });
    it('Shoudl throw if he number is wrong', () => {
      expect(() => AccountService.ValidateAndFormatPersonalIdentityNumber('44jjk')).toThrowError(ErrorCode.INVALID_PERSONAL_IDENTITY_NUMBER);
    });
    it('Shoudl throw if the age is below 18', () => {
      expect(() => AccountService.ValidateAndFormatPersonalIdentityNumber('200101-1630')).toThrowError(ErrorCode.AGE_RESTRICTION);
    });
  });
});
