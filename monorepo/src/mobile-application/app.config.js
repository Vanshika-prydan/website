export default {
  expo: {
    name: 'Clean Green',
    slug: 'wcg',
    version: '1.0.7',
    orientation: 'portrait',
    owner: 'wecleangreen',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*', 'assets/*'],
    ios: {
      buildNumber: '1',
      supportsTablet: false,
      bundleIdentifier: 'se.cleangreen.wecleangreen',
      infoPlist: {
        NSCameraUsageDescription:
          'This app will use the camera to send visual feedback if the customer are not satisfied with the service.',
      },
    },
    android: {
      versionCode: 12,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'se.cleangreen.wecleangreen',
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        '@stripe/stripe-react-native',
        {
          merchantIdentifier: 'merchant.se.cleangreen.wecleangreen',
          enableGooglePay: false,
        },
      ],
      'sentry-expo',
    ],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'we-clean-green',
            project: 'mobile',
            authToken:
              'eee842bed2f6404e82e5edccb40da3e62403e875fb0647108b7bbfedff86499e',
          },
        },
      ],
    },
  },
};
