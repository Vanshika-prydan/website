module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    curly: ['error', 'multi'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-promise-executor-return': ['off'],
  },
};
