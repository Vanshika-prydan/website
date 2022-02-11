import React, { useEffect, useState } from 'react';

import validator from 'validator';
import Personnummer from 'personnummer';
import { CustomerModel } from '../../models/customer.model';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { CreateCustomerRequestPayload } from '../../services/api-service/types';

interface UseCreateCustomerProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  personalIdentityNumber?: string;
  password?: string;
}

const useCreateCustomer = (i: UseCreateCustomerProps = {}) => {
  const [firstName, setFirstName] = useState<string>(i.firstName ?? '');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState<string>(i.lastName ?? '');
  const [lastNameError, setlastNameError] = useState('');

  const [email, setEmail] = useState<string>(i.email ?? '');
  const [emailError, setEmailError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState<string>(i.phoneNumber ?? '');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [personalIdentityNumber, setPersonalIdentityNumber] = useState<string>(
    i.personalIdentityNumber ?? ''
  );
  const [personalIdentityNumberError, setPersonalIdentityNumberError] =
    useState('');

  const [password, setPassword] = useState<string | undefined>(i.password);
  const [passwordError, setPasswordError] = useState('');

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [responseError, setResponseError] = useState('');

  const resetToInitialState = () => {
    setFirstName(i.firstName ?? '');
    setLastName(i.lastName ?? '');
    setEmail(i.email ?? '');
    setPhoneNumber(i.phoneNumber ?? '');
    setPersonalIdentityNumber(i.personalIdentityNumber ?? '');
    setPassword(i.password ?? '');
    setSubmitIsDisabled(true);
    setIsLoading(false);
    setResponseError('');
  };

  useEffect(() => {
    setFirstNameError(validateFirstName());
    setlastNameError(validateLastName());
    setEmailError(validateEmail());
    setPhoneNumberError(validatePhoneNumber());
    setPersonalIdentityNumberError(validatePersonalIdentityNumber());
    setPasswordError(validatePassword());
    const missingRequiredFields = !firstName || !lastName || !email;
    const hasError =
      !!firstNameError ||
      !!lastNameError ||
      !!emailError ||
      !!phoneNumberError ||
      !!personalIdentityNumberError ||
      !!passwordError;
    setSubmitIsDisabled(hasError || isLoading || missingRequiredFields);
  });

  const validateFirstName = (): string => {
    if (firstName.length === 0) return '';
    if (!validator.isLength(firstName, { min: 2, max: 20 })) {
      return 'Förnamnet ser ut att vara inkorrekt';
    }
    return '';
  };
  const validateLastName = (): string => {
    if (lastName.length === 0) return '';
    if (!validator.isLength(lastName, { min: 2, max: 40 })) {
      return 'Efternamnet ser ut att vara inkorrekt';
    }
    return '';
  };
  const validateEmail = (): string => {
    if (email.length === 0) return '';
    if (!validator.isEmail(email)) return 'Emailen ser ut att vara inkorrekt';
    return '';
  };
  const validatePhoneNumber = (): string => {
    if (phoneNumber.length === 0) return '';
    if (!validator.isMobilePhone(phoneNumber)) {
      return 'Telefonnumret ser ut att vara inkorrekt';
    }
    return '';
  };

  const validatePersonalIdentityNumber = (): string => {
    if (personalIdentityNumber.length === 0) return '';
    if (!Personnummer.valid(personalIdentityNumber)) {
      return 'Personnumret ser ut att vara inkorrekt';
    }
    if (Personnummer.parse(personalIdentityNumber).getAge() < 18) {
      return 'Man måste var över 18 år för att använda vår tjänst';
    }
    return '';
  };

  const validatePassword = (): string => {
    if (!password || password.length === 0) return '';
    if (!validator.isStrongPassword(personalIdentityNumber)) {
      return 'Lösenordet är inte starkt nog';
    }
    return '';
  };

  const create = async (): Promise<CustomerModel> => {
    setIsLoading(true);
    try {
      const payload: CreateCustomerRequestPayload = {
        firstName,
        lastName,
        email,
        password: password || undefined,
        phoneNumber: phoneNumber,
        personalIdentityNumber: personalIdentityNumber,
      };
      const customer = await apiService.createCustomer(payload);
      setIsLoading(false);
      resetToInitialState();
      return customer;
    } catch (e) {
      setIsLoading(false);
      setResponseError(generateErrorMessage(e));
      throw new Error(e);
    }
  };

  return {
    firstName,
    setFirstName,
    firstNameError,
    lastName,
    setLastName,
    lastNameError,
    email,
    setEmail,
    emailError,
    phoneNumber,
    setPhoneNumber,
    phoneNumberError,
    personalIdentityNumber,
    setPersonalIdentityNumber,
    personalIdentityNumberError,
    password,
    setPassword,
    passwordError,
    submitIsDisabled,
    isLoading,
    responseError,
    create,
  };
};

export default useCreateCustomer;
