import React from 'react';
import { render } from '@testing-library/react';
import Login, { LoginProps } from './index';
import TestProvider from '../../utils/test-provider';

it('Should be able to render', () => {
  const props: LoginProps = {};
  render(<TestProvider> <Login {...props} /></TestProvider>);
});
