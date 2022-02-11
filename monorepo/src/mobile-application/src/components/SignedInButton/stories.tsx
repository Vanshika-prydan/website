import React from 'react';
import { storiesOf } from '@storybook/react-native';

// I import the component I want to display here
import SignedInButton from '.';

// here I define that I want to create stories with the label "Buttons",
// this will be the name in the storybook navigation

const buttonStories = storiesOf('Input/SignedInButton', module);

// then I add a story with the name default view, I can add multiple stories to button stories
buttonStories.add('default view', () => (
  <SignedInButton onPress={() => {}}>Title</SignedInButton>
));
