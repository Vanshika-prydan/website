import React from 'react';
import { Story, Meta } from '@storybook/react';

import Login, { LoginProps } from './index';

export default {
  title: 'Pages/Login',
  component: Login,
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = { };
