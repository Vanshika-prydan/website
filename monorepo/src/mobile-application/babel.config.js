module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@screens': './src/screens',
            '@store': './src/store',
            '@assets': './assets',
            '@components': './src/components',
            '@models': './src/models',
            '@navigation': './src/navigation',
            '@services': './src/services',
            '@utils': './src/utils',
            '@styles': './src/styles',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: true,
          allowUndefined: false,
        },
      ],
    ],
  };
};
