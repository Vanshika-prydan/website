
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';

configure({ adapter: new Adapter() });

interface Props {
    callback(): void
}

const TestHook = ({ callback }: Props) => {
  callback();
  return null;
};

export const testHook = (callback: () => void) => {
  mount(<TestHook callback={callback} />);
};
