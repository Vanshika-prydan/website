import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Color } from '../../styles';
import { RootState } from '../../store/rootReducer';
import Screen from '../screen';
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  MaterialIcons,
  Feather,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';
import MenuItem from './menu-item';
import AuthenticationService from '../../services/authentication-service';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { BoldText } from '../../components/Text';

type Props = DrawerContentComponentProps;

const Hr: React.FunctionComponent = () => (
  <View
    style={{
      borderTopWidth: 1,
      borderColor: 'rgba(68, 124, 56, 0.2)',
      marginHorizontal: 15,
    }}
  />
);

const DrawerMenu: React.FunctionComponent<Props> = (props) => {
  const account = useSelector(
    (state: RootState) => state.authentication.currentAccount
  );
  if (!account) return null;
  const { navigate } = props.navigation;
  const { routes, index } = props.state;
  const focusedRoute = routes[index].name;

  const ICON_SIZE = 24;
  const ICON_COLOR = Color.text;

  // navigation.navigate();
  return (
    <Fragment>
      <View style={styles.backgroundSetup}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => navigate(Screen.START)}
                style={styles.nameContainer}
              >
                <BoldText
                  style={styles.nameText}
                >{`${account.firstName} ${account.lastName}`}</BoldText>
              </TouchableOpacity>

              <Hr />
              <View style={styles.menuContainer}>
                {/* }
            <MenuItem
              isActive={focusedRoute === Screen.BOOKINGS}
              label="Boka städning"
              icon={
                <MaterialIcons
                  name="cleaning-services"
                  size={ICON_SIZE}
                  color={ICON_COLOR}
                />
              }
              onPress={() => navigate(Screen.BOOKINGS)}
            />
            { */}
                <MenuItem
                  isActive={focusedRoute === Screen.BOOKINGS}
                  label="Mina bokningar"
                  icon={
                    <MaterialCommunityIcons
                      name="calendar-outline"
                      size={ICON_SIZE}
                      color={ICON_COLOR}
                    />
                  }
                  onPress={() => navigate(Screen.BOOKINGS)}
                />
                <MenuItem
                  isActive={focusedRoute === Screen.PAYMENT_METHODS}
                  label="Betalningsmetoder"
                  icon={
                    <AntDesign
                      name="creditcard"
                      size={ICON_SIZE}
                      color={ICON_COLOR}
                    />
                  }
                  onPress={() => navigate(Screen.PAYMENT_METHODS)}
                />
                <MenuItem
                  isActive={focusedRoute === Screen.ADDRESSES}
                  label="Addresser"
                  icon={
                    <AntDesign
                      name="home"
                      size={ICON_SIZE}
                      color={ICON_COLOR}
                    />
                  }
                  onPress={() => navigate(Screen.ADDRESSES)}
                />
                <MenuItem
                  isActive={focusedRoute === Screen.SETTINGS}
                  label="Inställningar"
                  icon={
                    <Ionicons
                      size={ICON_SIZE}
                      color={ICON_COLOR}
                      name="settings-outline"
                    />
                  }
                  onPress={() => navigate(Screen.SETTINGS)}
                />
                <MenuItem
                  isActive={focusedRoute === Screen.CONTACT}
                  label="Kontakta oss"
                  icon={
                    <Ionicons
                      name="chatbox-ellipses-outline"
                      size={ICON_SIZE}
                      color={ICON_COLOR}
                    />
                  }
                  onPress={() => navigate(Screen.CONTACT)}
                />
                {/* }
            <MenuItem
              isActive={focusedRoute === Screen.BOOKINGS}
              label="Mer"
              icon={
                <Feather
                  name="more-horizontal"
                  size={ICON_SIZE}
                  color={ICON_COLOR}
                />
              }
              onPress={() => {}}
            /> { */}
              </View>
              <Hr />
            </View>
          </ScrollView>
          <Hr />
          <View style={styles.logoutContainer}>
            <MenuItem
              label="Logga ut"
              icon={
                <SimpleLineIcons
                  name="logout"
                  size={ICON_SIZE}
                  color={ICON_COLOR}
                />
              }
              onPress={AuthenticationService.logout}
            />
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={props.navigation.closeDrawer}
        >
          <Entypo name="cross" size={24} color={Color.text} />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  backgroundSetup: {
    marginTop: 50,
    flex: 1,
    backgroundColor: Color.background,
    borderTopEndRadius: 22,
    paddingTop: 25,
    marginRight: 24,
  },
  container: {
    flex: 1,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.text,
    paddingLeft: 20,
    marginTop: 25,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    height: 57,
    marginBottom: 20,
  },
  menuContainer: {
    marginVertical: 20,
  },
  logoutContainer: {
    marginTop: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    zIndex: 100,
    right: 0,
  },
  closeButton: {
    marginTop: 75,
    height: 57,
    width: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 57,
    backgroundColor: Color.background,
  },
});
