/* eslint-disable no-unused-vars */
export enum ErrorCode {
    ACCESS_DENIED = 'ACCESS_DENIED',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    EMPLOYEE_DOES_NOT_EXIST = 'EMPLOYEE_DOES_NOT_EXIST',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    CONSTRAINT_VIOLATED = 'CONSTRAINT_VIOLATED',
    MISSING_ID = 'MISSING_ID',
    TOKEN_TYPE_ERROR = 'TOKEN_TYPE_ERROR',
    CUSTOMER_DOES_NOT_EXIST = 'CUSTOMER_DOES_NOT_EXIST',
    INVALID_INPUT = 'INVALID_INPUT',
    DATABASE_ERROR = 'DATABASE_ERROR',
    ID_DOES_NOT_EXIST = 'ID_DOES_NOT_EXIST',

    INVALID_PERSONAL_IDENTITY_NUMBER = 'INVALID_PERSONAL_IDENTITY_NUMBER',
    PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS = 'PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS',
    MISSING_PERSONAL_IDENTITY_NUMBER = 'MISSING_PERSONAL_IDENTITY_NUMBER',
    PHONE_NUMBER_ALREADY_EXISTS = 'PHONE_NUMBER_ALREADY_EXISTS',

    MISSING_TOKEN = 'MISSING_TOKEN',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    JWT_FORMAT_ERROR = 'JWT_FORMAT_ERROR',
    TOKEN_NOT_YET_ACTIVE = 'TOKEN_NOT_YET_ACTIVE',
    UNKNOWN_TOKEN_ERROR = 'UNKNOWN_TOKEN_ERROR',

    ACCOUNT_DOES_NOT_EXIST = 'ACCOUNT_DOES_NOT_EXIST',

    DATETIME_ERROR = 'DATETIME_ERROR',

    TIME_SLOT_IS_NOT_AVAILABLE = 'TIME_SLOT_IS_NOT_AVAILABLE',

    INVALID_UUID_FORMAT = 'INVALID_UUID_FORMAT',

    PAYMENT_FAILED = 'PAYMENT_FAILED',

    MISSING_STRIPE_ID = 'MISSING_STRIPE_ID',

    AGE_RESTRICTION = 'AGE_RESTRICTION',

    INVALID_CODE = 'INVALID_CODE',
    CODE_EXPIRED = 'CODE_EXPIRED',

    WRONG_PASSWORD = 'WRONG_PASSWORD',

}
