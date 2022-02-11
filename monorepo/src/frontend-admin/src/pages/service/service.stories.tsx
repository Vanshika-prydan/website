import React from 'react';
import { Story, Meta } from '@storybook/react';

import Service, { Props } from './index';
import TestProvider from '../../utils/test-provider';

export default {
  title: 'Pages/services',
  component: Service,
} as Meta;

// @ts-ignore
const Template: Story<Props> = (args) => <TestProvider><Service {...args} /></TestProvider>;

export const Primary = Template.bind({});
Primary.args = {

};
