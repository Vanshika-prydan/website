import React from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../services/api-service';

export default class PushNotifications {
  async onAppStart (): Promise<void> {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        AsyncStorage.setItem('pushToken', token);

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      }
    } catch (e) {}
  }

  async register (): Promise<void> {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      if (!token) return;
      await apiService.registerDevice(token);
    } catch (e) {
      console.log(e);
    }
  }
}
