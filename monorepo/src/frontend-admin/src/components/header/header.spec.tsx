import React from 'react';
import { render } from '@testing-library/react';
import Header, { HeaderProps } from './index';

it('Should be able to render', () => {
  const props: HeaderProps = {};
  render(<Header {...props} />);
});
