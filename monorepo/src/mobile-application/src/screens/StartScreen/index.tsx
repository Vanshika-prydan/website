import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import LoadingScreen from './loading';
import SignUpStartScreen from './sign-up';
import SignedInStartScreen from './signed-in';

const StartScreen: React.FunctionComponent = () => {
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  if (authentication.isLoading) return <LoadingScreen />;

  if (authentication.isAuthenticated) return <SignedInStartScreen />;

  return <SignUpStartScreen />;
};

export default StartScreen;
