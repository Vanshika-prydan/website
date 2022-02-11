import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Screen from './screen';
import EnterPersonalInformationScreen from '../screens/EnterPersonalInformationScreen';
import StartScreen from '../screens/StartScreen';
import WhereToCleanScreen from '../screens/WhereToCleanScreen';
import ChooseServiceScreen from '../screens/ChooseServiceScreen';
import HomeDetailsScreen from '../screens/HomeDetailsScreen';
import ChooseTimeScreen from '../screens/ChooseTimeScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';

import LoginScreen from '../screens/LoginScreen';
import NotAvailableScreen from '../screens/NotAvailable';

import { Color } from '../styles';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import GoBackarrow from '../components/GoBackArrow';

const Stack = createStackNavigator();

const SignUpNavigation: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerBackTitle: '',
        // eslint-disable-next-line react/display-name
        headerLeft: ({ canGoBack }) =>
          canGoBack
            ? (
            <GoBackarrow onPress={() => navigation.goBack()} />
              )
            : undefined,
      })}
      initialRouteName={Screen.START}
    >
      <Stack.Screen
        name={Screen.START}
        component={StartScreen}
        options={{ title: 'Start' }}
      />
      <Stack.Screen
        name={Screen.ENTER_PERSONAL_INFORMATION}
        component={EnterPersonalInformationScreen}
        options={{
          title: '',
        }}
      />

      <Stack.Screen
        name={Screen.WHERE_TO_CLEAN}
        component={WhereToCleanScreen}
        options={{
          title: '',
        }}
      />

      <Stack.Screen
        name={Screen.CHOOSE_SERVICE}
        component={ChooseServiceScreen}
        options={({ navigation }) => ({
          // eslint-disable-next-line react/display-name
          headerLeft: () => (
            <GoBackarrow
              onPress={() => navigation.goBack()}
              color={Color.primary}
            />
          ),
        })}
      />

      <Stack.Screen
        name={Screen.HOME_DETAILS}
        component={HomeDetailsScreen}
        options={{
          title: 'Hemstäd',
        }}
      />
      <Stack.Screen
        name={Screen.CHOOSE_TIME}
        component={ChooseTimeScreen}
        options={{ title: 'Välj tid' }}
      />
      <Stack.Screen
        name={Screen.CONFIRMATION}
        component={ConfirmationScreen}
        options={{ title: 'Bekräfa bokning' }}
      />
      <Stack.Screen
        name={Screen.CARD_DETAILS}
        component={CardDetailsScreen}
        options={{ title: 'Kortdetaljer' }}
      />
      <Stack.Screen
        name={Screen.LOGIN}
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name={Screen.NOT_AVAIABLE}
        component={NotAvailableScreen}
        options={{ title: 'Not available' }}
      />
      <Stack.Screen
        name={Screen.FORGOTTEN_PASSWORD}
        component={ForgottenPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default SignUpNavigation;
