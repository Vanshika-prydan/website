import { render } from '@testing-library/react';
import React from 'react';
import TestProvider from '../../utils/test-provider';

import BookingPage from './index';

describe('Booking page', () => {
  it('Should render', () => {
    render(<TestProvider><BookingPage /></TestProvider>);
  });
});
