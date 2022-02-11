import React from 'react';
import { render } from '@testing-library/react';

import Employees from './index';
import TestProvider from '../../utils/test-provider';
describe('Employees page', () => {
  it('should render', () => {
    render(<TestProvider><Employees /></TestProvider>);
  });
});
