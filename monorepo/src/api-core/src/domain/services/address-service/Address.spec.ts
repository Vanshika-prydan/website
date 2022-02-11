import { AddressService, INVALID_ADDRESS_NAME, INVALID_CODE, INVALID_COUNTRY_CODE, INVALID_POSTAL_CITY, INVALID_POSTAL_CODE, INVALID_STREET } from '.';
import Address from '../../entities/Address';
import { IAddress } from '../../entities/Address/IAddress';

describe('Address entity', () => {
  it('Should be possible to initiate a new address', () => {
    const data: IAddress = {
      addressId: 'uuid',
      street: 'Tomtebogatan 6, nb',
      postalCity: 'Stockholm',
      postalCode: '11723',
      country: 'SE',
      addressName: 'Hemma',
      information: '',
    };

    const { addressId, street, postalCity, postalCode, country, addressName, information } = new Address(data);
    expect(addressId).toBe('uuid');
    expect(street).toBe('Tomtebogatan 6, nb');
    expect(postalCity).toBe('Stockholm');
    expect(postalCode).toBe('11723');
    expect(country).toBe('SE');
    expect(addressName).toBe('Hemma');
    expect(information).toBe('');
  });

  describe('validateAndFormatAddressName', () => {
    it('should return undefined if the name is undefined', () => {
      expect(AddressService.validateAndFormatAddressName(undefined)).toBe(undefined);
    });
    it('should accept a correct ddress', () => {
      expect(AddressService.validateAndFormatAddressName('Hemma')).toBe('Hemma');
    });
    it('should trim and format the address', () => {
      expect(AddressService.validateAndFormatAddressName('   HEMMA 6  ')).toBe('Hemma 6');
    });
    it('should throw an error when the string is shorter than 6 chars', () => {
      expect(() => AddressService.validateAndFormatAddressName('T')).toThrow(INVALID_ADDRESS_NAME);
    });
    it('should throw an error when the string is longer than 40 chars', () => {
      expect(() => AddressService.validateAndFormatAddressName('wlqforgfufqnpcssrstjuafbkzpshchjrspmnbwkjqpwqdlpumtgcbxeapbcyvqbgkznnfcufymhppiozmmfrlivywkmukbjjxglp')).toThrow(INVALID_ADDRESS_NAME);
    });
  });

  describe('validateAndFormatStreet', () => {
    it('should accept a correct ddress', () => {
      expect(AddressService.validateAndFormatStreet('Tomtebogatan 6')).toBe('Tomtebogatan 6');
    });
    it('should trim and format the address', () => {
      expect(AddressService.validateAndFormatStreet('   TOMTEBOGATAN 6  ')).toBe('Tomtebogatan 6');
    });
    it('should throw an error when the string is shorter than 6 chars', () => {
      expect(() => AddressService.validateAndFormatStreet('tre')).toThrow(INVALID_STREET);
    });
    it('should throw an error when the string is longer than 150 chars', () => {
      expect(() => AddressService.validateAndFormatStreet('wlqforgfufqnpcssrstjuafbkzpshchjrspmnbwkjqpwqdlpumtgcbxeapbcyvqbgkznnfcufymhppiozmmfrlivywkmukbjjxglpwlqforgfufqnpcssrstjuafbkzpshchjrspmnbwkjqpwqdlpumtgcbxeapbcyvqbgkznnfcufymhppiozmmfrlivywkmukbjjxglp')).toThrow(INVALID_STREET);
    });
  });

  describe('validateAndFormatPostalCode', () => {
    it('should accept a valid postal code', () => {
      expect(AddressService.validateAndFormatPostalCode('117 23')).toBe('11723');
    });
    it('should accept a valid postal code with a strange format', () => {
      expect(AddressService.validateAndFormatPostalCode('  117 23   ')).toBe('11723');
    });
    it('should throw an error if the formated postal code isnt a number', () => {
      expect(() => AddressService.validateAndFormatPostalCode('stes 11')).toThrow(INVALID_POSTAL_CODE);
    });
    it('Should throw an error if the postal codes length is not 5', () => {
      expect(() => AddressService.validateAndFormatPostalCode('123456')).toThrow(INVALID_POSTAL_CODE);
    });
  });

  describe('validateAndFormatPostalCity', () => {
    it('should accept and return a correct city', () => {
      expect(AddressService.validateAndFormatPostalCity('Stockholm')).toBe('Stockholm');
    });
    it('should accept and return a correct formated city', () => {
      expect(AddressService.validateAndFormatPostalCity('    STOCKHOLM ')).toBe('Stockholm');
    });
    it('should throw an error if the city name is shorter than 2 chars', () => {
      expect(() => AddressService.validateAndFormatPostalCity(' x')).toThrow(INVALID_POSTAL_CITY);
    });
    it('should throw an error if the city name is longer than 50 chars', () => {
      expect(() => AddressService.validateAndFormatPostalCity('fmpuejvcifrkbghnbcellgebuivangmzegwjfitipqnmbrovnnelenhreoad')).toThrow(INVALID_POSTAL_CITY);
    });
  });

  describe('validateAndFormatCountry', () => {
    it('should accept and return a valid country code', () => {
      expect(AddressService.validateAndFormatCountry('SE')).toBe('SE');
    });
    it('should accept and return a valid country code with spaces and lowe cases', () => {
      expect(AddressService.validateAndFormatCountry('  se ')).toBe('SE');
    });
    it('should throw an error of the codes length is not 2', () => {
      expect(() => AddressService.validateAndFormatCountry('  SWE ')).toThrow(INVALID_COUNTRY_CODE);
    });
    it('should throw an error if a country that does not exists are inserted', () => {
      expect(() => AddressService.validateAndFormatCountry('RR')).toThrow(INVALID_COUNTRY_CODE);
    });
  });
  describe('validateAndFormatInformation', () => {
    it('should return undefined if the name is undefined', () => {
      expect(AddressService.validateAndFormatInformation(undefined)).toBe(undefined);
    });
    it('should accept an empty string', () => {
      expect(AddressService.validateAndFormatInformation('')).toBe('');
    });
    it('should trim the string', () => {
      expect(AddressService.validateAndFormatInformation('  Portkod:\n 1122')).toBe('Portkod:\n 1122');
    });
  });

  describe('validateAndFormatCode', () => {
    it('should return undefined if the name is undefined', () => {
      expect(AddressService.validateAndFormatCode(undefined)).toBe(undefined);
    });
    it('should accept an empty string', () => {
      expect(AddressService.validateAndFormatCode('')).toBe('');
    });
    it('should trim the string', () => {
      expect(AddressService.validateAndFormatCode('  1122')).toBe('1122');
    });
    it('should complain if the code is longer than 20 chars', () => {
      expect(() => AddressService.validateAndFormatCode('123456789012345678901')).toThrow(INVALID_CODE);
    });
  });
});
