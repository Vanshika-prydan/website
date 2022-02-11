import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Screen from './screen';
import StartScreen from '../screens/StartScreen';
import { RootState } from 'store/rootReducer';
import { useSelector } from 'react-redux';
import BookingsScreen from '../screens/BookingsScreen';
import withMenuButton from './with-menu-button';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import DrawerMenu from './drawer-menu';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import AddressesScreen from '../screens/AddressesScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import SignedInBookCleaningScreen from '../screens/SignedInBookCleaningScreen';

const Drawer = createDrawerNavigator();

const SignedInNavigation: React.FunctionComponent = () => {
  const account = useSelector(
    (state: RootState) => state.authentication.currentAccount
  );

  if (!account) return null;
  return (
    <Drawer.Navigator
      initialRouteName={Screen.START}
      drawerContent={(props) => {
        // @ts-ignore
        return <DrawerMenu {...props} />;
      }}
      drawerStyle={{ width: '80%', backgroundColor: 'rgba(0,0,0,0)' }}
    >
      <Drawer.Screen
        name={Screen.START}
        component={withMenuButton(StartScreen)}
        options={{
          title: `${account.firstName} ${account.lastName}`,
        }}
      />

      <Drawer.Screen
        name={Screen.BOOKINGS}
        component={withMenuButton(BookingsScreen)}
        options={{
          title: 'Mina bokningar',
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name={Screen.PAYMENT_METHODS}
        component={PaymentMethodsScreen}
        options={{ title: 'Betalningsmetoder', unmountOnBlur: true }}
      />
      <Drawer.Screen
        name={Screen.SETTINGS}
        component={SettingsScreen}
        options={{ title: 'Inställningar', unmountOnBlur: true }}
      />
      <Drawer.Screen
        name={Screen.CONTACT}
        component={withMenuButton(ContactScreen)}
      />
      <Drawer.Screen
        name={Screen.ADDRESSES}
        component={withMenuButton(AddressesScreen)}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name={Screen.ADD_ADDRESS}
        component={withMenuButton(AddAddressScreen)}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name={Screen.NEW_BOOKING}
        component={SignedInBookCleaningScreen}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};

export default SignedInNavigation;
