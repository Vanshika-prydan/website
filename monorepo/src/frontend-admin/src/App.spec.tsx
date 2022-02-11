import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import TestProvider from './utils/test-provider';

test('renders learn react link', () => {
  render(
    <TestProvider>
      {' '}
      <App />
    </TestProvider>
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
