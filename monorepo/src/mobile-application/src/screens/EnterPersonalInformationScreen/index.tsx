import { useNavigation } from '@react-navigation/native';
import Screen from '../../navigation/screen';
import Personnummer from 'personnummer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import validator from 'validator';
import { makeBookingActions } from '../../store/make-booking';
import EnterPersonalInformationPresenter from './presenter';

const EnterPersonalInformationScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.makeBooking);

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  useEffect(() => {});

  const setStreet = (val: string) =>
    dispatch(makeBookingActions.setStreet(val));
  const setCode = (val: string) =>
    dispatch(makeBookingActions.setDoorCode(val));
  const setFirstName = (val: string) =>
    dispatch(makeBookingActions.setFirstName(val));
  const setLastName = (val: string) =>
    dispatch(makeBookingActions.setLastName(val));
  const setEmail = (val: string) => dispatch(makeBookingActions.setEmail(val));
  const setPhoneNumber = (val: string) =>
    dispatch(makeBookingActions.setPhoneNumber(val));
  const setPersonalIdentityNumber = (val: string) =>
    dispatch(makeBookingActions.setPersonalIdentityNumber(val));

  const [streetError, setStreetError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [personalIdentityNumberError, setPersonalIdentityNumberError] =
    useState('');

  const validateStreet = (): string => {
    if (booking.street.length === 0) return '';
    if (!validator.isLength(booking.street, { min: 4, max: 100 })) {
      return 'Gatunamnet set ut att vara inkorrekt';
    }
    return '';
  };
  const validateCode = (): string => {
    if (booking.doorCode.length === 0) return '';
    if (!validator.isLength(booking.doorCode, { max: 30 })) {
      return 'Kontrollera koden';
    }
    return '';
  };
  const validateFirstName = (): string => {
    if (booking.firstName.length === 0) return '';
    if (!validator.isLength(booking.firstName, { min: 2, max: 20 })) {
      return 'Förnamnet ser ut att vara inkorrekt';
    }
    return '';
  };
  const validateLastName = (): string => {
    if (booking.lastName.length === 0) return '';
    if (!validator.isLength(booking.lastName, { min: 2, max: 40 })) {
      return 'Efternamnet ser ut att vara inkorrekt';
    }
    return '';
  };
  const validateEmail = (): string => {
    if (booking.email.length === 0) return '';
    if (!validator.isEmail(booking.email)) {
      return 'Emailen ser ut att vara inkorrekt';
    }
    return '';
  };
  const validatePhoneNumber = (): string => {
    if (booking.phoneNumber.length === 0) return '';
    if (!validator.isMobilePhone(booking.phoneNumber, 'sv-SE')) {
      return 'Telefonnumret ser ut att vara inkorrekt. Vi accepterar endast svenska mobilnummer för tillfället.';
    }
    return '';
  };

  const validatePersonalIdentityNumber = (): string => {
    if (booking.personalIdentityNumber.length === 0) return '';
    if (!Personnummer.valid(booking.personalIdentityNumber)) {
      return 'Personnumret ser ut att vara inkorrekt';
    }
    return '';
  };

  useEffect(() => {
    setStreetError(validateStreet());
    setCodeError(validateCode());
    setFirstNameError(validateFirstName());
    setlastNameError(validateLastName());
    setEmailError(validateEmail());
    setPhoneNumberError(validatePhoneNumber());
    setPersonalIdentityNumberError(validatePersonalIdentityNumber());

    const missingRequiredFields =
      !booking.street ||
      !booking.firstName ||
      !booking.lastName ||
      !booking.email ||
      !booking.phoneNumber ||
      !booking.personalIdentityNumber;

    const hasError =
      !!streetError ||
      !!codeError ||
      !!firstNameError ||
      !!lastNameError ||
      !!emailError ||
      !!phoneNumberError ||
      !!personalIdentityNumberError;

    setSubmitIsDisabled(hasError || missingRequiredFields);
  });

  const onSubmit = async () => {
    console.log(booking);
    navigation.navigate(Screen.CONFIRMATION);
  };
  return (
    <EnterPersonalInformationPresenter
      {...{
        street: booking.street,
        setStreet,
        streetError,
        code: booking.doorCode,
        setCode,
        codeError,
        firstName: booking.firstName,
        setFirstName,
        firstNameError,
        lastName: booking.lastName,
        setLastName,
        lastNameError,
        email: booking.email,
        setEmail,
        emailError,
        phoneNumber: booking.phoneNumber,
        setPhoneNumber,
        phoneNumberError,
        personalIdentityNumber: booking.personalIdentityNumber,
        setPersonalIdentityNumber,
        personalIdentityNumberError,
        submitIsDisabled,
      }}
      onSubmit={onSubmit}
    />
  );
};

export default EnterPersonalInformationScreen;
