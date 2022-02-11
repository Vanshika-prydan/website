import { render } from '@testing-library/react';
import React from 'react';
import Customer from '.';
import TestProvider from '../../utils/test-provider';

describe('Customer page', () => {
  it('Should render', () => {
    render(<TestProvider><Customer /></TestProvider>);
  });
});
