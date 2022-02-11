import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withMenuButton from '../../navigation/with-menu-button';
import Start from './start';
import Addons from './addons';
import GoBackArrow from '../../components/GoBackArrow';
import Time from './time';
import Confirmation from './confirmation';
import { BookingScreen } from './BookingScreen';

const Stack = createStackNavigator();

const SignedInBookCleaningScreen: React.FunctionComponent = () => {
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
            <GoBackArrow onPress={() => navigation.goBack()} />
              )
            : undefined,
      })}
      initialRouteName={BookingScreen.START}
    >
      <Stack.Screen
        name={BookingScreen.START}
        component={withMenuButton(Start)}
      />
      <Stack.Screen name={BookingScreen.ADDONS} component={Addons} />
      <Stack.Screen name={BookingScreen.TIME} component={Time} />
      <Stack.Screen
        name={BookingScreen.CONFIRMATION}
        component={Confirmation}
      />
    </Stack.Navigator>
  );
};

export default SignedInBookCleaningScreen;
