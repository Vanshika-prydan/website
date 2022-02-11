import React from 'react';
import { render } from '@testing-library/react';
import CreateEmployee, { CreateEmployeeProps } from '.';
import TestProvider from '../../../utils/test-provider';

it('should render', () => {
  const args: CreateEmployeeProps = { isOpen: true, onCancel: () => {}, onCreated: () => {} };
  render(<TestProvider><CreateEmployee {...args} /></TestProvider>);
});
