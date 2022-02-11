module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:security/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'security',
  ],
  rules: {
    curly: ['error', 'multi'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-promise-executor-return': ['off'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
  },
};
