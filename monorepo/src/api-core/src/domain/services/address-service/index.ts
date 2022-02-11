import validator from 'validator';
import { CountryCode, COUNTRY_CODE } from '../../entities/CountryCode';
import { upperCaseFirst } from '../../../utilities/upper-case-first';

export const INVALID_ADDRESS_NAME = 'INVALID_ADDRESS_NAME';
export const INVALID_STREET = 'INVALID_STREET';
export const INVALID_POSTAL_CODE = 'INVALID_POSTAL_CODE';
export const INVALID_POSTAL_CITY = 'INVALID_POSTAL_CITY';
export const INVALID_COUNTRY_CODE = 'INVALID_COUNTRY_CODE';
export const INVALID_INFORMATION = 'INVALID_INFORMATION';
export const INVALID_CODE = 'INVALID_CODE';

export class AddressService {
  public static validateAndFormatAddressName (addressName: string | undefined | null): string | undefined {
    if (addressName === undefined || addressName === null) return undefined;
    const formattedAdress = upperCaseFirst(addressName.trim().toLowerCase());
    if (!validator.isLength(formattedAdress, { min: 2, max: 40 })) throw new Error(INVALID_ADDRESS_NAME);
    return formattedAdress;
  }

  public static validateAndFormatStreet (street: string): string {
    const formattedStreet = upperCaseFirst(street.trim().toLowerCase());
    if (!validator.isLength(formattedStreet, { min: 4, max: 150 })) throw new Error(INVALID_STREET);
    return formattedStreet;
  }

  public static validateAndFormatPostalCode (code: string):string {
    const formattedCode = code.replace(/ /g, '');
    if (!validator.isInt(formattedCode) || formattedCode.length !== 5) throw new Error(INVALID_POSTAL_CODE);
    return formattedCode;
  }

  public static validateAndFormatPostalCity (city: string):string {
    const formattedCity = upperCaseFirst(city.trim().toLowerCase());
    if (!validator.isLength(formattedCity, { min: 2, max: 50 })) throw new Error(INVALID_POSTAL_CITY);
    return formattedCity;
  }

  public static validateAndFormatCountry (countryCode: string): CountryCode {
    const formattedCountry = countryCode.trim().toUpperCase();
    if (formattedCountry.length !== 2) throw new Error(INVALID_COUNTRY_CODE);
    const countryCodeExits = Object.entries(COUNTRY_CODE).find(c => c[0] === formattedCountry) !== undefined;
    if (!countryCodeExits) throw new Error(INVALID_COUNTRY_CODE);

    return formattedCountry as CountryCode;
  }

  public static validateAndFormatInformation (text: string | undefined | null): string | undefined {
    if (text === undefined || text === null) return undefined;
    const formattedText = text.trim();
    if (!validator.isLength(formattedText, { max: 4000 })) throw new Error(INVALID_INFORMATION);
    return formattedText;
  }

  public static validateAndFormatCode (code: string|undefined|null): string | undefined {
    if (code === undefined || code === null) return undefined;
    const formattedCode = code.trim();
    if (!validator.isLength(formattedCode, { max: 20 })) throw new Error(INVALID_CODE);
    return formattedCode;
  }
}
