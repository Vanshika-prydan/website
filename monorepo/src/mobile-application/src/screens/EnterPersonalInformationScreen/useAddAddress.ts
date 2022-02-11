import React, { useEffect, useState } from 'react';

import validator from 'validator';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { CustomerModel } from 'models/customer.model';
import { AddCustomerAddressRequestPayload } from 'services/api-service/types';

export interface UseAddAddressProps {
  street?: string;
  postalCode?: string;
  countryCode?: string;
  postalCity?: string;
  information?: string;
  code?: string;
}

export const useAddAddress = (i: UseAddAddressProps = {}) => {
  const [street, setStreet] = useState(i.street ?? '');
  const [streetError, setStreetError] = useState('');

  const [postalCode, setPostalCode] = useState(i.postalCode ?? '');
  const [postalCodeError, setPostalCodeError] = useState('');

  const [countryCode, setCountryCode] = useState(i.countryCode ?? 'SE');
  const [countryCodeError, setCountryCodeError] = useState('');

  const [postalCity, setPostalCity] = useState(i.postalCity ?? '');
  const [postalCityError, setPostalCityError] = useState('');

  const [information, setInformation] = useState(i.information ?? '');
  const [informationError, setInformationError] = useState('');

  const [code, setCode] = useState(i.code ?? '');
  const [codeError, setCodeError] = useState('');

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [responseError, setResponseError] = useState('');

  const validateStreet = (): string => {
    if (street.length === 0) return '';
    if (!validator.isLength(street, { min: 4, max: 100 })) {
      return 'Gatunamnet set ut att vara inkorrekt';
    }
    return '';
  };
  const validatePostalCode = (): string => {
    if (postalCode.length === 0) return '';
    if (postalCode.length !== 5 || isNaN(Number(postalCode))) {
      return 'Postkoden måste vara numerisk och fem tecken lång.';
    }
    return '';
  };

  const validateCountryCode = (): string => {
    if (postalCode.length === 0) return '';
    if (postalCode.length !== 5) {
      return 'Landskoden ska vara 2 tecken lång.';
    }
    return '';
  };

  const validatePostalCity = (): string => {
    if (postalCity.length === 0) return '';
    if (!validator.isLength(postalCity, { min: 4, max: 100 })) {
      return 'Kontrollera staden';
    }
    return '';
  };

  const validateInformation = (): string => {
    if (information.length === 0) return '';
    if (!validator.isLength(information, { max: 2000 })) {
      return 'Max 1000 tecken.';
    }
    return '';
  };

  const validateCode = (): string => {
    if (code.length === 0) return '';
    if (!validator.isLength(code, { max: 30 })) {
      return 'Kontrollera koden';
    }
    return '';
  };

  useEffect(() => {
    setStreetError(validateStreet());
    setPostalCodeError(validatePostalCode());
    setCountryCodeError(validateCountryCode());
    setPostalCityError(validatePostalCity());
    setInformationError(validateInformation());
    setCodeError(validateCode());

    const missingRequiredFields =
      !street || !postalCode || !countryCode || !postalCode;

    const hasError =
      !!streetError ||
      !!postalCodeError ||
      !!countryCodeError ||
      !!postalCityError ||
      !!informationError ||
      !!codeError;

    setSubmitIsDisabled(hasError || isLoading || missingRequiredFields);
  });

  const add = async (customerId: string): Promise<CustomerModel> => {
    setIsLoading(true);
    setResponseError('');
    try {
      const payload: AddCustomerAddressRequestPayload = {
        street,
        postalCity,
        postalCode,
        country: countryCode,
        information,
        code,
      };
      const updated = await apiService.addCustomerAddress(payload, customerId);
      setIsLoading(false);
      return updated;
    } catch (e) {
      setIsLoading(false);
      setResponseError(generateErrorMessage(e));
      throw new Error(e);
    }
  };

  return {
    street,
    setStreet,
    streetError,
    postalCode,
    setPostalCode,
    postalCodeError,
    countryCode,
    setCountryCode,
    countryCodeError,
    postalCity,
    setPostalCity,
    postalCityError,
    information,
    setInformation,
    informationError,
    code,
    setCode,
    codeError,
    isLoading,
    responseError,
    submitIsDisabled,
    add,
  };
};
