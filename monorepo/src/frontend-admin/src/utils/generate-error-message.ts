import { ErrorModel } from '../models/error.model';

export const generateErrorMessage = (errorResponse: ErrorModel | unknown) => {
  if ((errorResponse as ErrorModel)?.errorCode) {
    switch ((errorResponse as ErrorModel).errorCode) {
      case 'EMAIL_ALREADY_EXISTS':
        return 'The email is already used by an account';
      case 'INVALID_PASSWORD':
        return 'The password correct';
      case 'ACCESS_DENIED':
        return 'Access denied for this resource';
      case 'TIME_SLOT_IS_NOT_AVAILABLE':
        return 'The time slot for the given employee is not available';
      case 'PASSWORD_IS_VIOLATED':
        return 'The password is not strong enough';
      case 'EMPLOYEE_DOES_NOT_EXIST':
        return 'The employee does not exist';
      case 'CONSTRAINT_VIOLATED':
        return 'One or more constraints were violated in the input';
      case 'ID_DOES_NOT_EXIST':
        return 'The requested id does not exist';
      case 'MISSING_ID':
        return 'No id was provided.';
      case 'CUSTOMER_DOES_NOT_EXIST':
        return 'The customer does not exist';
      case 'INVALID_INPUT':
        return 'The input was invalid.';
      case 'DATABASE_ERROR':
        return 'An error occurred in the database. Either is the database offline or is one or more constraints violated.';
      case 'TOKEN_EXPIRED':
        return 'The token has expired. Please login again.';
      case 'ACCOUNT_DOES_NOT_EXIST':
        return 'The account does not exist';
      case 'DATETIME_ERROR':
        return 'The date format was invalid';
      case 'INVALID_UUID_FORMAT':
        return 'The format of the id is invalid.';
      case 'INVALID_PERSONAL_IDENTITY_NUMBER':
        return 'The personal identity number does not have a correct format';
      case 'PAYMENT_FAILED':
        return 'Payment failed. The customer is informed and we will retry to charge the card later.';
      case 'TOKEN_TYPE_ERROR':
        return 'Invalid token';
      case 'PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS':
        return 'This personal identity number is already used by another user.';
      case 'MISSING_PERSONAL_IDENTITY_NUMBER':
        return 'No personal identity number was provided';
      case 'PHONE_NUMBER_ALREADY_EXISTS':
        return 'The phone number is already used by another account.';
      case 'MISSING_TOKEN':
        return 'Error. No token was present';
      case 'JWT_FORMAT_ERROR':
        return 'Invalid format of the token';
      case 'TOKEN_NOT_YET_ACTIVE':
        return 'Token is not yet activated';
      case 'UNKNOWN_TOKEN_ERROR':
        return 'Unknown token error';
      case 'MISSING_STRIPE_ID':
        return 'The related stripe id is missing';
      case 'AGE_RESTRICTION':
        return 'The customer must be more than 18 years old';
      case 'INVALID_CODE':
        return 'The given code is invalid';
      case 'CODE_EXPIRED':
        return 'The code has expired';
      case 'WRONG_PASSWORD':
        return "The given password does not match the user's";
      default:
        return 'Unknown error';
    }
  }
  return 'Error. Probably an issue with the network';
};
export default generateErrorMessage;
