import { useEffect, useState } from 'react';
import validator from 'validator';
import Personnummer from 'personnummer';
import { CustomerModel } from '../../../models/customer.model';
import { ErrorModel } from '../../../models/error.model';
import ApiServiceType from '../../../services/api-service/api-service';
import { CreateCustomerRequestPayload } from '../../../services/api-service/types';
import { generateErrorMessage } from '../../../utils/generate-error-message';

interface Setup {
  // eslint-disable-next-line no-unused-vars
  onCreated(customer: CustomerModel): void;
  // eslint-disable-next-line no-unused-vars
  onError?(error: ErrorModel): void;
  ApiService: typeof ApiServiceType;
}

export const useCreateCustomer = ({
  ApiService,
  onCreated,
  onError,
}: Setup) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [personalIdentityNumber, setPersonalIdentityNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () =>
    firstName &&
    lastName &&
    validator.isEmail(email) &&
    validator.isMobilePhone(phoneNumber, 'sv-SE') &&
    Personnummer.valid(personalIdentityNumber);

  useEffect(() => {
    setSubmitIsDisabled(!validate() || isLoading);
  });

  const resetState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setIsLoading(false);
    setSubmitIsDisabled(true);
    setErrorMessage('');
    setPersonalIdentityNumber('');
  };

  const createCustomer = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const payload: CreateCustomerRequestPayload = {
        firstName,
        lastName,
        email,
        password: password || undefined,
        phoneNumber: phoneNumber || undefined,
        personalIdentityNumber,
      };

      const customer = await ApiService.createCustomer(payload);
      resetState();
      onCreated(customer);
    } catch (e) {
      if (onError) onError(e as ErrorModel);
      setErrorMessage(generateErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isLoading,
    createCustomer,
    submitIsDisabled,
    errorMessage,
    resetState,
    personalIdentityNumber,
    setPersonalIdentityNumber,
  };
};

export default useCreateCustomer;
