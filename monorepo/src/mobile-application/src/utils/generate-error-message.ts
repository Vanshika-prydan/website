import { ErrorModel } from '../models/error.model';
import * as Sentry from '@sentry/react-native';

export const generateErrorMessage = (error: unknown): string => {
  if (!(error as ErrorModel).errorCode) {
    if ((error as Error).message === 'Network Error') {
      return 'Ett nätverksfel uppstod. Se till att du har tillgång till internet.';
    } else return (error as Error).message;
  }

  const errorResponse = error as ErrorModel;
  if (errorResponse?.errorCode) {
    switch (errorResponse.errorCode) {
      case 'EMAIL_ALREADY_EXISTS':
        return 'Epostadressen är redan regstrerad i systemet.';
      case 'INVALID_PASSWORD':
        return 'Lösenordet är inkorrekt';
      case 'ACCESS_DENIED':
        return 'Resurs ej tillåten';
      case 'TIME_SLOT_IS_NOT_AVAILABLE':
        return 'Tyvärr finns det ingen ledig tid vid valt tillfälle';
      case 'PASSWORD_IS_VIOLATED':
        return 'Lösenordet är inte starkt nog';
      case 'EMPLOYEE_DOES_NOT_EXIST':
        return 'Den anställde existerar ej.';
      case 'CONSTRAINT_VIOLATED':
        return 'Felaktig indata';
      case 'ID_DOES_NOT_EXIST':
        return 'Det efterfrågade objektet finns inte';
      case 'MISSING_ID':
        return 'Inget id är angivet.';
      case 'CUSTOMER_DOES_NOT_EXIST':
        return 'Kunden existerar ej';
      case 'INVALID_INPUT':
        return 'Felaktig indata.';
      case 'DATABASE_ERROR':
        return 'Kunde inte utföra operationen mot databasen.';
      case 'TOKEN_EXPIRED':
        return 'Du har varit inaktiv för länge, vänligen logga in igen.';
      case 'ACCOUNT_DOES_NOT_EXIST':
        return 'Kontot existerar ej.';
      case 'DATETIME_ERROR':
        return 'Felaktigt datumformat.';
      case 'INVALID_UUID_FORMAT':
        return 'Inget giltigt uuid4.';
      case 'INVALID_PERSONAL_IDENTITY_NUMBER':
        return 'Personnumret ser inte ut att vara korrekt formaterat';
      case 'INVALID_PHONE_NUMBER':
        return 'Telefonnumret har ett ogiltigt format';
      case 'PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS':
        return 'Personnumret du angav är redan använt. Har du redan ett konto?';
      case 'ACCOUNT_NOT_ACTIVATED':
        return 'Kontot är inte aktiverat';
      case 'INVALID_STREET':
        return 'Gick inte att lägga till gatan';
      case 'WRONG_PASSWORD':
        return 'Felaktigt lösenord';
      case 'PHONE_NUMBER_ALREADY_EXISTS':
        return 'Telefonnumret är redan registrerat till ett konto.';
      case 'INVALID_CODE':
        return 'Den angivna koden existerar inte eller har gått ut. Vänligen försök igen.';
      default:
        Sentry.captureException(errorResponse);
        return `Okänt felmeddelande: ${errorResponse.errorCode}`;
    }
  } else {
    return (error as Error).message;
    /* try {
      throw new Error(`Error was not caught, ${JSON.stringify(errorResponse)}`);
    } catch (e) {
      Sentry.captureException(errorResponse);
      return 'Ett okänt fel inträffade';
    } */
  }
};
