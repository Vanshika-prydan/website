import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddNewCard from './add-new-card';
import Start from './start';
import GoBackarrow from '../../components/GoBackArrow';
import withMenuButton from '../../navigation/with-menu-button';
import { PaymentScreen } from './screen-enum';
const Stack = createStackNavigator();

const PaymentMethodsScreen: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerBackTitle: '',
        // eslint-disable-next-line react/display-name
        headerLeft: undefined,
      })}
      initialRouteName={PaymentScreen.START}
    >
      <Stack.Screen
        name={PaymentScreen.START}
        component={withMenuButton(Start)}
      />
      <Stack.Screen
        name={PaymentScreen.ADD_CARD}
        component={AddNewCard}
        options={({ navigation }) => ({
          // eslint-disable-next-line react/display-name
          headerLeft: () => <GoBackarrow onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default PaymentMethodsScreen;
