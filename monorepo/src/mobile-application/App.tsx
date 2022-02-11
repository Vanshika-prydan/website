import React, { useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import * as Sentry from 'sentry-expo';

import {
  STRIPE_PUBLISHABLE_KEY,
  ENVIRONMENT,
  APPLE_MERCHANT_ID,
  SENTRY_DSN,
  API_URL,
  NODE_ENV,
} from '@env';

import StorybookUIRoot from './storybook/index.js';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import AuthenticationService from './src/services/authentication-service';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import PushNotifications from './src/utils/push-notifications';

Sentry.init({
  dsn: SENTRY_DSN,
  enableInExpoDevelopment: ENVIRONMENT !== 'production',
  debug: ENVIRONMENT !== 'production',
});

console.log(`ENV: ${ENVIRONMENT}\tAPI: ${API_URL}`);

export default function App (): JSX.Element {
  const [fontsLoaded] = useFonts({
    BalooChettan2Regular: require('./assets/Baloo_Chettan_2/BalooChettan2-Regular.ttf'),
    BalooChettan2Medium: require('./assets/Baloo_Chettan_2/BalooChettan2-Medium.ttf'),
    BalooChettan2Bold: require('./assets/Baloo_Chettan_2/BalooChettan2-SemiBold.ttf'),
  });
  if (NODE_ENV === 'storybook') return <StorybookUIRoot />;

  useEffect(() => {
    AuthenticationService.onLoad();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  (async () => await new PushNotifications().onAppStart())();

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier={APPLE_MERCHANT_ID}
    >
      <Provider store={store}>
        <Navigation />
      </Provider>
    </StripeProvider>
  );
}
