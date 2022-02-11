
import { render } from '@testing-library/react';
import React from 'react';
import CustomerList, { CustomerListProps } from '.';
import TestProvider from '../../../utils/test-provider';

describe('CustomerList', () => {
  it('should render', () => {
    const props:CustomerListProps = {};
    render(<TestProvider><CustomerList {...props} /></TestProvider>);
  });
});
