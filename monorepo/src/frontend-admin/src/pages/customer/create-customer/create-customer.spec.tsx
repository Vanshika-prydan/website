import React from 'react';
import { render } from '@testing-library/react';
import CreateCustomer, { CreateCustomerProps } from '.';
import TestProvider from '../../../utils/test-provider';

it('should render', () => {
  const args: CreateCustomerProps = { isOpen: true, onClose: () => {}, onCreated: () => {} };
  render(<TestProvider><CreateCustomer {...args} /></TestProvider>);
});
