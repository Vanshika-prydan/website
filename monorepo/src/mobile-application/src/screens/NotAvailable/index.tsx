import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import validator from 'validator';
import NotAvailableScreenPresenter from './presenter';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';

export type Page = 'START' | 'EMAIL' | 'CONFIRMATION';

const NotAvailableScreen: React.FunctionComponent = () => {
  const [page, setPage] = useState<Page>('START');
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const postalCode = useSelector(
    (state: RootState) => state.makeBooking.postalCode
  );

  useEffect(() => {
    setEmail(email.trim());
    setEmailIsValid(validator.isEmail(email.trim()));
  });

  const saveEmail = async () => {
    await apiService.appendToWaitingList({ email, postalCode });
  };

  const onPressNext = async () => {
    if (page === 'START') {
      try {
        setIsLoading(true);
        await saveEmail();
        setPage('CONFIRMATION');
      } catch (e) {
        Alert.alert('Misslyckades med spara', generateErrorMessage(e));
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <NotAvailableScreenPresenter
      {...{
        onPressBack: () => nav.goBack(),
        onPressNext,
        email,
        setEmail,
        emailIsValid,
        page,
        isLoading,
      }}
    />
  );
};

export default NotAvailableScreen;

const styles = StyleSheet.create({});
