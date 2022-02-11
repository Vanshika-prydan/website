import { render } from '@testing-library/react';
import React from 'react';
import TestProvider from '../../../utils/test-provider';

import CreateBooking from './index';
describe('Create booking block', () => {
  it('Shoud render', () => {
    render(<TestProvider><CreateBooking onClose={() => {}} isOpen={true} /></TestProvider>);
  });
});
