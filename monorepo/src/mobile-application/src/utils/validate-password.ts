import validator from 'validator';

const validatePassword = (pw: string) =>
  validator.isStrongPassword(pw, {
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  });

export default validatePassword;
