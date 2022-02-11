import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { RootState } from '@store/rootReducer';
import { useSelector } from 'react-redux';

import SignedInNavigation from './signed-in-navigation';
import SignUpNavigation from './sign-up-navigation';

const Navigation: React.FunctionComponent = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );
  const isRegistering = useSelector(
    (state: RootState) => state.authentication.isRegistering
  );

  return (
    <NavigationContainer>
      {isAuthenticated && !isRegistering
        ? (
        <SignedInNavigation />
          )
        : (
        <SignUpNavigation />
          )}
    </NavigationContainer>
  );
};

export default Navigation;
