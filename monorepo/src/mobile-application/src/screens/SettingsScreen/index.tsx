import React from 'react';
import { TouchableOpacity } from 'react-native';
import Password from './password';
import SettingsStart from './start';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import withMenuButton from '../../navigation/with-menu-button';

const Stack = createStackNavigator();
const SettingsScreen: React.FunctionComponent = () => {
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-sharp"
                size={30}
                color="#FFF"
                style={{ padding: 10, marginLeft: 10 }}
              />
            </TouchableOpacity>
              )
            : undefined,
      })}
    >
      <Stack.Screen
        name="SETTINGS_START"
        component={withMenuButton(SettingsStart)}
      />
      <Stack.Screen name="SETTINGS_PASSWORD" component={Password} />
    </Stack.Navigator>
  );
};

export default SettingsScreen;
