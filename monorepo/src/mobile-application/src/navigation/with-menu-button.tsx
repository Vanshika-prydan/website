/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';

const withMenuButton =
  <Props extends unknown>(Component: React.ComponentType<Props>) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (props: React.Component<Props>) => {
      const nav = useNavigation();
      return (
      <Fragment>
        <Component {...(props as any)} />
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => nav.dispatch(DrawerActions.openDrawer())}
            containerStyle={styles.button}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../../assets/hamburger_white.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </SafeAreaView>
      </Fragment>
      );
    };

export default withMenuButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    elevation: 100,
  },
  button: {
    padding: 10,
    marginLeft: 10,
  },
});
