module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  ignorePatterns: ['.expo/**/*', 'node_modules/**/*'],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'jest'],
  rules: {
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        tsx: 'never',
        ts: 'neer',
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    semi: ['error', 'always'],
  },
};
