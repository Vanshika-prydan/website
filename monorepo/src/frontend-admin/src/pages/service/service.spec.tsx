import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../utils/test-provider';
import Service from './index';

describe('Service page', () => {
  it('Should render', () => {
    render(<TestProvider><Service /></TestProvider>);
  });
});
